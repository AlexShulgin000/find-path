import {useAsyncGeneric} from "./useAsyncGeneric.js";
import {Devvit} from "@devvit/public-api";
import {IGameData} from "../types.js";
import {GAME_DEMO_DATA} from "../const.js";

export const useGetInitialData = (context: Devvit.Context) => {
  const {
    data: currentUser,
    loading: currentUserLoading,
    error: currentUserError,
  } = useAsyncGeneric(async () => {
    return await context.reddit.getCurrentUser();
  });

  const {
    data: subreddit,
    loading: subredditLoading,
    error: subredditError,
  } = useAsyncGeneric(async () => {
    return await context.reddit.getCurrentSubreddit();
  });

  const postId = context.postId;
  const {
    data: gameData,
    loading: gameLoading,
    error: gameError,
  } = useAsyncGeneric(
    async () => {
      if (!postId) return null;
      const res = await context.redis.hGetAll(postId);
      if (!res || !res.path) return GAME_DEMO_DATA;
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
    currentUser: currentUser ?? null,
    gameData: gameData ?? null,
    subreddit: subreddit ?? null,
    isLoading: currentUserLoading || gameLoading || subredditLoading,
    isError: !!(currentUserError || gameError || subredditError),
  };
};
