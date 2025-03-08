import {StartPage} from "./pages/start/Start.js";
import {IPageProps} from "./types.js";
import {GamePage} from "./pages/game/GamePage.js";

export enum EPage {
  start = "start",
  game = "game",
}

export const PAGES: Record<EPage, (props: IPageProps) => JSX.Element> = {
  [EPage.start]: StartPage,
  [EPage.game]: GamePage,
};
