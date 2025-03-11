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
    return await this.context.redis.zAdd(this.getUserPostKey(), {
      score: time,
      member: this.currentUser.username,
    });
  }

  async getPostLeaders() {
    return await this.context.redis.zRange(this.getUserPostKey(), 0, 5, {
      by: "rank",
      reverse: true,
    });
  }

  // TODO create the same for leaderboard
  async getCurrentUserFromLeaders() {
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
    return {
      name: this.currentUser.username,
      rank: rank ?? 0,
      score: score ?? 0,
    } as ILeaderboardCurrentUser;
  }

  // leaderboard
  async getLeaderboard() {
    return await this.context.redis.zRange(DATA_KEYS.leaderboard, 0, 5, {
      by: "rank",
    });
  }

  async increaseUserVictoryLeaderboard(score: number) {
    return await this.context.redis.hIncrBy(
      DATA_KEYS.leaderboard,
      this.currentUser.id,
      score,
    );
  }
}
