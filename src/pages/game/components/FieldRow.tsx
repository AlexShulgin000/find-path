import {Devvit} from "@devvit/public-api";
import {TBlock} from "../../../types.js";
import {FieldBlock} from "./FieldBlock.js";
import {CELL_RADIUS, ROW_GAPS} from "../game.const.js";

interface IFieldBlockProps {
  row: TBlock[];
  onCellPress: (rowIndex: number, cellIndex: number) => void;
  index: number;
}

export const FieldRow = ({row, index, onCellPress}: IFieldBlockProps) => {
  const key = index as keyof typeof CELL_RADIUS;
  return (
    <hstack
      alignment="center"
      width="100%"
      height="56px"
      padding="small"
      gap={ROW_GAPS[key]}>
      {row.map((_, cellIndex) => (
        <FieldBlock
          onPress={() => onCellPress(index, cellIndex)}
          cornerRadius={CELL_RADIUS[key]}
        />
      ))}
    </hstack>
  );
};
