import {EPage} from "./const.js";
import {Devvit, Subreddit, User} from "@devvit/public-api";

type SizePixels = `${number}px`;
type SizePercent = `${number}%`;
export type SizeString = SizePixels | SizePercent | number;
export type ContainerCornerRadius =
  | "none"
  | "small"
  | "medium"
  | "large"
  | "full";

export interface IPageProps {
  onChangeActivePage: (page: EPage) => void;
  context: Devvit.Context;
  gameData: any;
  currentUser: User | null;
  subreddit: Subreddit | null;
}

export type TBlock = number | null;

export type TBlocks = TBlock[][];

export interface IHeroPosition {
  rowIndex: number;
  cellIndex: number;
}

export type TAllowedSteps = Record<string, Set<number>>;
