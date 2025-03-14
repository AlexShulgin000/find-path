import {Devvit, User} from "@devvit/public-api";
import {IGameData, TBlocks} from "../types.js";
import {PREFIX_USER_POSTS_KEY} from "../const.js";

interface IRequestParams {
  context: Devvit.Context;
  currentUser: User;
}

export class PostDataService {
  private constructor() {}

  private static getLastUserPostsKey(username: string) {
    return `user_posts_${username}`;
  }

  static async getLastUserPosts({context, currentUser}: IRequestParams) {
    const ids = await PostDataService.getLastUserPostsIds({
      context,
      currentUser,
    });
    if (!ids) return null;
    const gameData = await Promise.all(
      ids.map(id => context.redis.hGetAll(id)),
    );
    const passedData = await Promise.all(
      ids.map(id => context.redis.zCard(`${PREFIX_USER_POSTS_KEY}${id}`)),
    );

    if (!gameData) return null;
    if (gameData.length !== passedData.length) return null;
    return gameData.map((gameData, i) => ({
      postId: gameData.postId,
      authorName: gameData.authorName,
      path: JSON.parse(gameData.path),
      passed: passedData[i],
    })) as (IGameData & {passed: number})[];
  }

  static async getLastUserPostsIds({context, currentUser}: IRequestParams) {
    const res = await context.redis.get(
      PostDataService.getLastUserPostsKey(currentUser.username),
    );
    return res ? (JSON.parse(res) as string[]) : null;
  }

  static async addLastUserPost(
    {context, currentUser}: IRequestParams,
    newPostId: string,
  ) {
    const prev = await PostDataService.getLastUserPostsIds({
      context,
      currentUser,
    });
    let res: string[] = [newPostId];
    if (prev) {
      res = [newPostId, ...prev.slice(0, 3)];
    }
    return await context.redis.set(
      PostDataService.getLastUserPostsKey(currentUser.username),
      JSON.stringify(res),
    );
  }

  static async addPost(
    {context, currentUser}: IRequestParams,
    {path, postId}: {postId: string; path: TBlocks},
  ) {
    return await context.redis.hSet(postId, {
      postId,
      authorName: currentUser.username,
      path: JSON.stringify(path),
    });
  }
}
