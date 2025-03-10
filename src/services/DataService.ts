import {Devvit, Post, User} from "@devvit/public-api";
import {IGameData} from "../types.js";
import {DATA_KEYS} from "../const.js";

interface IDataServiceProps {
  context: Devvit.Context;
  currentUser: User;
  post: Post | null;
  gameData: IGameData;
}

export class DataService {
  private context: IDataServiceProps["context"];
  private gameData: IDataServiceProps["gameData"];
  private post: IDataServiceProps["post"];
  private currentUser: IDataServiceProps["currentUser"];

  constructor({context, gameData, post, currentUser}: IDataServiceProps) {
    this.context = context;
    this.gameData = gameData;
    this.post = post;
    this.currentUser = currentUser;
  }

  private getUserPostKey(postId: string) {
    return `time_${postId}`;
  }

  async setUserVictoryPost(time: number, score: number) {
    const postId = this.post?.id ?? this.gameData.postId;
    await this.context.redis.hSet(this.getUserPostKey(postId), {
      time: `${time}`,
      score: `${score}`,
      userId: this.currentUser.id,
    });
  }

  async getLeadersPost(postId: string) {
    return await this.context.redis.zRange(this.getUserPostKey(postId), 0, 5, {
      by: "score",
    });
  }

  async getLeaderboard() {
    return await this.context.redis.zRange(DATA_KEYS.leaderboard, 0, 5, {
      by: "score",
    });
  }

  async increaseUserVictoryLeaderboard(score: number) {
    // tODO check, working with new user?
    const res = await this.context.redis.hIncrBy(
      DATA_KEYS.leaderboard,
      this.currentUser.id,
      score,
    );
    console.log(999, res);
    return res;
  }
}
