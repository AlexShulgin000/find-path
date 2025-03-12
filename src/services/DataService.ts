import {Devvit, User} from "@devvit/public-api";
import {IGameData, ILeaderboardCurrentUser} from "../types.js";
import {DATA_KEYS} from "../const.js";

interface IDataServiceProps {
  context: Devvit.Context;
  currentUser: User;
  gameData: IGameData;
}

export class DataService {
  private context: IDataServiceProps["context"];
  private gameData: IDataServiceProps["gameData"];
  private currentUser: IDataServiceProps["currentUser"];
  private readonly postId: string;

  constructor({context, gameData, currentUser}: IDataServiceProps) {
    this.context = context;
    this.gameData = gameData;
    this.currentUser = currentUser;
    this.postId = this.gameData.postId;
  }

  // post
  private getUserPostKey() {
    return `post_leaders_${this.postId}`;
  }

  async setUserVictoryPost(time: number) {
    await this.context.redis.zAdd(this.getUserPostKey(), {
      score: time,
      member: this.currentUser.username,
    });
  }

  async getPostLeaders() {
    return await this.context.redis.zRange(this.getUserPostKey(), 0, 5, {
      by: "rank",
    });
  }

  async getCurrentUserFromPostLeaders() {
    const [rank, score] = await Promise.all([
      this.context.redis.zRank(
        this.getUserPostKey(),
        this.currentUser.username,
      ),
      this.context.redis.zScore(
        this.getUserPostKey(),
        this.currentUser.username,
      ),
    ]);
    if (rank === undefined || !score) return null;
    return {
      name: this.currentUser.username,
      rank: rank + 1,
      score,
    } as ILeaderboardCurrentUser;
  }

  // leaderboard
  async getLeaderboard() {
    return await this.context.redis.zRange(DATA_KEYS.leaderboard, 0, 5, {
      by: "rank",
      reverse: true,
    });
  }

  async increaseUserVictoryLeaderboard(score: number, time: number) {
    const prevScore = await this.context.redis.zScore(
      DATA_KEYS.leaderboard,
      this.currentUser.id,
    );
    return await Promise.all([
      this.context.redis.zAdd(DATA_KEYS.leaderboard, {
        score: score + (prevScore ?? 0),
        member: this.currentUser.username,
      }),
      this.context.redis.zAdd(DATA_KEYS.leaderboardRank, {
        score: time,
        member: this.currentUser.username,
      }),
    ]);
  }

  async getCurrentUserFromLeaderboard() {
    const [rank, score] = await Promise.all([
      this.context.redis.zRank(
        DATA_KEYS.leaderboardRank,
        this.currentUser.username,
      ),
      this.context.redis.zScore(
        DATA_KEYS.leaderboard,
        this.currentUser.username,
      ),
    ]);
    if (rank === undefined || !score) return null;
    return {
      name: this.currentUser.username,
      rank: rank + 1,
      score,
    } as ILeaderboardCurrentUser;
  }
}
