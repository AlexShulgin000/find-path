import {Devvit, User} from "@devvit/public-api";
import {ILeaderboardCurrentUser} from "../types.js";
import {DATA_KEYS} from "../const.js";

interface IRequestParams {
  context: Devvit.Context;
  currentUser: User;
}

export class LeadersDataService {
  private constructor() {}

  private static getUserPostId(context: IRequestParams["context"]) {
    return context.postId ?? "";
  }

  // post
  private static getUserPostKey(context: IRequestParams["context"]) {
    return `post_leaders_${LeadersDataService.getUserPostId(context)}`;
  }

  static async setUserVictoryPost(
    {currentUser, context}: IRequestParams,
    {time}: {time: number},
  ) {
    await context.redis.zAdd(LeadersDataService.getUserPostKey(context), {
      score: time,
      member: currentUser.username,
    });
  }

  static async getPostLeaders({context}: Pick<IRequestParams, "context">) {
    return await context.redis.zRange(
      LeadersDataService.getUserPostKey(context),
      0,
      5,
      {
        by: "rank",
      },
    );
  }

  static async getCurrentUserFromPostLeaders({
    context,
    currentUser,
  }: IRequestParams) {
    const [rank, score] = await Promise.all([
      context.redis.zRank(
        LeadersDataService.getUserPostKey(context),
        currentUser.username,
      ),
      context.redis.zScore(
        LeadersDataService.getUserPostKey(context),
        currentUser.username,
      ),
    ]);
    if (rank === undefined || !score) return null;
    return {
      name: currentUser.username,
      rank: rank + 1,
      score,
    } as ILeaderboardCurrentUser;
  }

  // leaderboard
  static async getLeaderboard({context}: Pick<IRequestParams, "context">) {
    return await context.redis.zRange(DATA_KEYS.leaderboard, 0, 5, {
      by: "rank",
      reverse: true,
    });
  }

  static async increaseUserVictoryLeaderboard(
    {currentUser, context}: IRequestParams,
    {score, time}: {score: number; time: number},
  ) {
    const prevScore = await context.redis.zScore(
      DATA_KEYS.leaderboard,
      currentUser.id,
    );
    return await Promise.all([
      context.redis.zAdd(DATA_KEYS.leaderboard, {
        score: score + (prevScore ?? 0),
        member: currentUser.username,
      }),
      context.redis.zAdd(DATA_KEYS.leaderboardRank, {
        score: time,
        member: currentUser.username,
      }),
    ]);
  }

  static async getCurrentUserFromLeaderboard({
    currentUser,
    context,
  }: IRequestParams) {
    const [rank, score] = await Promise.all([
      context.redis.zRank(DATA_KEYS.leaderboardRank, currentUser.username),
      context.redis.zScore(DATA_KEYS.leaderboard, currentUser.username),
    ]);
    if (rank === undefined || !score) return null;
    return {
      name: currentUser.username,
      rank: rank + 1,
      score,
    } as ILeaderboardCurrentUser;
  }
}
