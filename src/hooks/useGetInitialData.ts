import {useAsyncGeneric} from "./useAsyncGeneric.js";
import {Devvit, User} from "@devvit/public-api";
import {IGameData} from "../types.js";
import {GAME_DEMO_DATA} from "../const.js";
import {LeadersDataService} from "../services/LeadersDataService.js";

export const useGetInitialData = (context: Devvit.Context) => {
  const {
    data: currentUser,
    loading: currentUserLoading,
    error: currentUserError,
  } = useAsyncGeneric(async () => {
    return (await context.reddit.getCurrentUser()) ?? null;
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

  const {
    data: completedGameData,
    loading: completedGameLoading,
    error: completedGameError,
  } = useAsyncGeneric(
    async () => {
      if (!currentUser) return null;
      return await LeadersDataService.getCurrentUserFromPostLeaders({
        context,
        currentUser,
      });
    },
    {
      depends: currentUser?.id ?? null,
    },
  );

  return {
    completedGameData,
    currentUser: currentUser as User,
    gameData,
    isLoading: currentUserLoading || gameLoading || completedGameLoading,
    isError: !!(currentUserError || gameError || completedGameError),
  };
};
