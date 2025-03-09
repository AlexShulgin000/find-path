import {StartPage} from "./pages/start/Start.js";
import {IPageProps} from "./types.js";
import {GamePage} from "./pages/game/GamePage.js";
import {CreateGamePage} from "./pages/create-game/CreateGamePage.js";
import {ShowHiddenPathPage} from "./pages/show-hidden-path/ShowHiddenPathPage.js";

export enum EPage {
  start = "start",
  game = "game",
  createGame = "createGame",
  showHiddenPath = "showHiddenPath",
}

export const PAGES: Record<EPage, (props: IPageProps) => JSX.Element> = {
  [EPage.start]: StartPage,
  [EPage.game]: GamePage,
  [EPage.createGame]: CreateGamePage,
  [EPage.showHiddenPath]: ShowHiddenPathPage,
};

export const MAX_ROWS = 7;
export const MAX_CELLS = 4;
