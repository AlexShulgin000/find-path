import {useAsyncGeneric} from "./useAsyncGeneric.js";
import {Devvit} from "@devvit/public-api";
import {IGameData} from "../types.js";

export const useGetInitialData = (context: Devvit.Context) => {
  const {
    data: currentUser,
    loading: currentUserLoading,
    error: currentUserError,
  } = useAsyncGeneric(async () => {
    return await context.reddit.getCurrentUser();
  });

  const {
    data: post,
    loading: loadingPost,
    error: postError,
  } = useAsyncGeneric(async () => {
    return await context.reddit.getPostById(context.postId ?? "");
  });

  const {
    data: subreddit,
    loading: subredditLoading,
    error: subredditError,
  } = useAsyncGeneric(async () => {
    return await context.reddit.getCurrentSubreddit();
  });

  const postId = post?.id;
  const {
    data: gameData,
    loading: gameLoading,
    error: gameError,
  } = useAsyncGeneric(
    async () => {
      if (!postId) return null;
      const res = await context.redis.hGetAll(postId);
      if (!res || !res.path) return null;
      return {
        postId: res.postId,
        authorName: res.authorName,
        path: JSON.parse(res.path),
      } as IGameData;
    },
    {
      depends: postId,
    },
  );

  return {
    post: post ?? null,
    currentUser: currentUser ?? null,
    gameData: gameData ?? null,
    subreddit: subreddit ?? null,
    isLoading:
      currentUserLoading || loadingPost || gameLoading || subredditLoading,
    isError: !!(currentUserError || postError || gameError || subredditError),
  };
};
