import {TBlocks} from "./types.js";

export const checkIsLastRowField = (path: TBlocks) => {
  return path[path.length - 1].some(cell => cell);
};
