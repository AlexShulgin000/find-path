import {Devvit, User} from "@devvit/public-api";
import {ILeaderboardCurrentUser} from "../types.js";
import {PREFIX_USER_POSTS_KEY} from "../const.js";

const DATA_KEYS = {
  leaderboard: "tLeaderboard",
} as const;

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
  private static getPostLeadersKey(context: IRequestParams["context"]) {
    return `${PREFIX_USER_POSTS_KEY}${LeadersDataService.getUserPostId(context)}`;
  }

  static async setUserVictoryPost(
    {currentUser, context}: IRequestParams,
    {time}: {time: number},
  ) {
    await context.redis.zAdd(LeadersDataService.getPostLeadersKey(context), {
      score: time,
      member: currentUser.username,
    });
  }

  static async getPostLeaders({context}: Pick<IRequestParams, "context">) {
    return await context.redis.zRange(
      LeadersDataService.getPostLeadersKey(context),
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
        LeadersDataService.getPostLeadersKey(context),
        currentUser.username,
      ),
      context.redis.zScore(
        LeadersDataService.getPostLeadersKey(context),
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
    {score}: {score: number},
  ) {
    return await context.redis.zIncrBy(
      DATA_KEYS.leaderboard,
      currentUser.username,
      score,
    );
  }

  static async getCurrentUserFromLeaderboard({
    currentUser,
    context,
  }: IRequestParams) {
    const [rank, leaderCounts, score] = await Promise.all([
      context.redis.zRank(DATA_KEYS.leaderboard, currentUser.username),
      context.redis.zCard(DATA_KEYS.leaderboard),
      context.redis.zScore(DATA_KEYS.leaderboard, currentUser.username),
    ]);
    if (rank === undefined || !score) return null;
    return {
      name: currentUser.username,
      rank: leaderCounts - rank,
      score,
    } as ILeaderboardCurrentUser;
  }
}
