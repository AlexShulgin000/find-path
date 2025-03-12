import {StartPage} from "./pages/start/Start.js";
import {IGameData, IPageProps, TBlocks} from "./types.js";
import {GamePage} from "./pages/game/GamePage.js";
import {CreateGamePage} from "./pages/create-game/CreateGamePage.js";
import {ShowHiddenPathPage} from "./pages/show-hidden-path/ShowHiddenPathPage.js";
import {PostPage} from "./pages/post/PostPage.js";
import {GameStatFailPage} from "./pages/game-stat/GameStatFailPage.js";
import {GameStatVictoryPage} from "./pages/game-stat/GameStatVictoryPage.js";
import {LeaderboardPage} from "./pages/game-stat/LeaderboardPage.js";
import {GameStatPostLeaders} from "./pages/game-stat/GameStatPostLeaders.js";

export enum EPage {
  start = "start",
  game = "game",
  createGame = "createGame",
  showHiddenPath = "showHiddenPath",
  post = "post",
  gameFail = "gameFail",
  gameVictory = "gameVictory",
  leaderboard = "leaderboard",
  postLeaders = "postLeaders",
}

export const PAGES: Record<EPage, (props: IPageProps) => JSX.Element> = {
  [EPage.start]: StartPage,
  [EPage.game]: GamePage,
  [EPage.createGame]: CreateGamePage,
  [EPage.showHiddenPath]: ShowHiddenPathPage,
  [EPage.post]: PostPage,
  [EPage.gameFail]: GameStatFailPage,
  [EPage.gameVictory]: GameStatVictoryPage,
  [EPage.leaderboard]: LeaderboardPage,
  [EPage.postLeaders]: GameStatPostLeaders,
};

export const MAX_ROWS = 7;
export const MAX_CELLS = 4;

export const SCORE_MULTIPLIER = 100;

export const DATA_KEYS = {
  leaderboard: "tLeaderboard",
  leaderboardRank: "tLeaderboardRank",
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

export const GAME_DEMO_POST_KEY = "GAME_DEMO_POST_KEY";

export const GAME_DEMO_DATA: IGameData = {
  postId: GAME_DEMO_POST_KEY,
  authorName: GAME_DEMO_OPPONENT_NAME,
  path: GAME_DEMO_PATH,
};

export const IMAGE_DESKTOP_NAMES = {
  field: "field.jpg",
  hero: "hero.png",
  torch: "torch.jpg",
} as const;

export const IMAGE_MOBILE_NAMES = {
  torchMobile: "torch_m.jpg",
  fieldMobile: "field_m.jpg",
} as const;
