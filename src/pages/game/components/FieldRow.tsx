import {Devvit} from "@devvit/public-api";
import {TBlock} from "../../../types.js";
import {FieldBlock} from "./FieldBlock.js";

interface IFieldBlockProps {
    row: TBlock[]
}

export const FieldRow = ({row}: IFieldBlockProps) => {
    return (<hstack   width='100%' height='100%'
                      padding='small'
                      gap='small'>
        {/* TODO add block id? */}
        {row.map((block) => <FieldBlock   />)}
    </hstack>)
}
