import {useAsync} from "@devvit/public-api";
import type {
  AsyncUseStateInitializer,
  UseAsyncResult,
} from "@devvit/public-api/types/hooks.js";
import {AsyncOptions} from "@devvit/public-api/devvit/internals/blocks/handler/useAsync.js";

export const useAsyncGeneric = <T>(
  arg: AsyncUseStateInitializer<T>,
  // @ts-ignore
  options?: AsyncOptions<T>,
): UseAsyncResult<T> => {
  // @ts-ignore
  return useAsync<T>(arg, options);
};
