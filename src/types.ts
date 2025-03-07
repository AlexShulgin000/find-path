import {EPage} from "./const.js";

type SizePixels = `${number}px`;
type SizePercent = `${number}%`;
export type SizeString = SizePixels | SizePercent | number;

export interface IPageProps {
    onChangeActivePage: (page: EPage) => void;
}

export type TBlock = number | null
export type TBlocks = TBlock[][]
