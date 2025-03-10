import {TBlocks} from "./types.js";
import {Post} from "@devvit/public-api";

export const checkIsLastRowField = (path: TBlocks) => {
  return path[path.length - 1].some(cell => cell);
};

export const getPostId = (post: Post | null) => {
  const id = post?.id;
  return id ?? "MAIN_GAME_POST_ID";
};

// TODO maybe create service?
export const getPostUserTimeKey = (postId: string, userId: string) => {
  return `time_${postId}_${userId}`;
};
