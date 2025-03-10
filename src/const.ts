import {StartPage} from "./pages/start/Start.js";
import {IPageProps, TBlocks} from "./types.js";
import {GamePage} from "./pages/game/GamePage.js";
import {CreateGamePage} from "./pages/create-game/CreateGamePage.js";
import {ShowHiddenPathPage} from "./pages/show-hidden-path/ShowHiddenPathPage.js";
import {PostPage} from "./pages/post/PostPage.js";
import {GameStatFail} from "./pages/game-stat/GameStatFail.js";
import {GameStatVictory} from "./pages/game-stat/GameStatVictory.js";

export enum EPage {
  start = "start",
  game = "game",
  createGame = "createGame",
  showHiddenPath = "showHiddenPath",
  post = "post",
  gameFail = "gameFail",
  gameVictory = "gameVictory",
}

export const PAGES: Record<EPage, (props: IPageProps) => JSX.Element> = {
  [EPage.start]: StartPage,
  [EPage.game]: GamePage,
  [EPage.createGame]: CreateGamePage,
  [EPage.showHiddenPath]: ShowHiddenPathPage,
  [EPage.post]: PostPage,
  [EPage.gameFail]: GameStatFail,
  [EPage.gameVictory]: GameStatVictory,
};

export const MAX_ROWS = 7;
export const MAX_CELLS = 4;

export const SCORE_MULTIPLIER = 100;

export const DATA_KEYS = {
  score: "score",
  time: "time",
} as const;

// x | | |
// x x x |
// | | x |
// | x x |
// x x | |
// x x x |
// | | x x
export const GAME_DEMO_PATH: TBlocks = [
  [0, null, null, null],
  [1, 2, 3, null],
  [null, null, 4, null],
  [null, 6, 5, null],
  [8, 7, null, null],
  [9, 10, 11, null],
  [null, null, 12, 13],
];

export const GAME_DEMO_OPPONENT_NAME = "Alex Shulgin";
