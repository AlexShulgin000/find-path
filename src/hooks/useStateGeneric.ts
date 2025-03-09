import {useState} from "@devvit/public-api";
import type {
  UseStateInitializer,
  UseStateResult,
} from "@devvit/public-api/types/hooks.js";

/** For client state */
export const useStateGeneric = <T>(
  arg: UseStateInitializer<T>,
): UseStateResult<T> => {
  // @ts-ignore
  return useState<T>(arg);
};
