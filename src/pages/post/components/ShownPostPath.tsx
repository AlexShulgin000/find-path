import {TBlock, TBlocks} from "../../../types.js";
import {FieldRow} from "../../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../../components/game-field/FieldBlock.js";
import {THEME} from "../../../theme.js";
import {AllowedStep} from "../../../components/game-field/AllowedStep.js";
import {Devvit} from "@devvit/public-api";

interface IShownPostPathProps {
  path: TBlocks;
  lastPointNumber: TBlock;
}

const FULL_SIZE = "35px";
const INNER_SIZE = "30px";

export const ShownPostPath = ({path, lastPointNumber}: IShownPostPathProps) => {
  return path.map((row, rowIndex) => (
    <FieldRow>
      {row.map((_, cellIndex) => {
        const firstPoint = path[rowIndex][cellIndex] === 0;
        const lastPoint = lastPointNumber === path[rowIndex][cellIndex];
        return (
          <FieldBlock
            width={FULL_SIZE}
            innerWidth={INNER_SIZE}
            height={FULL_SIZE}
            innerHeight={INNER_SIZE}
            rowIndex={rowIndex}
            backgroundColor={
              path[rowIndex][cellIndex] === null
                ? THEME.colors.dark
                : THEME.colors.orange
            }>
            {(firstPoint || lastPoint) && (
              <AllowedStep color={THEME.colors.dark} />
            )}
          </FieldBlock>
        );
      })}
    </FieldRow>
  ));
};
