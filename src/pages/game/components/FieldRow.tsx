import {Devvit} from "@devvit/public-api";
import {IHeroPosition, TBlock} from "../../../types.js";
import {FieldBlock} from "./FieldBlock.js";
import {CELL_RADIUS, ROW_GAPS} from "../game.const.js";

interface IFieldBlockProps {
  row: TBlock[];
  onCellPress: (rowIndex: number, cellIndex: number) => void;
  index: number;
  heroPosition: IHeroPosition;
}

export const FieldRow = ({
  row,
  index,
  onCellPress,
  heroPosition,
}: IFieldBlockProps) => {
  const key = index as keyof typeof CELL_RADIUS;
  return (
    <hstack
      alignment="center"
      width="100%"
      // padding="small"
      gap={ROW_GAPS[key]}>
      {/* TODO may be out it from component in parent? */}
      {row.map((_, cellIndex) => (
        <FieldBlock
          onPress={() => onCellPress(index, cellIndex)}
          cornerRadius={CELL_RADIUS[key]}
          isHero={
            heroPosition.rowIndex === index &&
            heroPosition.cellIndex === cellIndex
          }
        />
      ))}
    </hstack>
  );
};
