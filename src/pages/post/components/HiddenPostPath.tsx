import {FieldRow} from "../../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../../components/game-field/FieldBlock.js";
import {THEME} from "../../../theme.js";
import {AllowedStep} from "../../../components/game-field/AllowedStep.js";
import {Text} from "../../../components/text/Text.js";
import {Devvit} from "@devvit/public-api";
import {TBlock, TBlocks} from "../../../types.js";

interface IHiddenPathProps {
  blocksUp: TBlocks;
  blocksBottom: TBlocks;
  lastPointNumber: TBlock;
}

export const HiddenPostPath = ({
  blocksUp,
  blocksBottom,
  lastPointNumber,
}: IHiddenPathProps) => {
  return (
    <>
      {blocksUp.map((row, rowIndex) => (
        <FieldRow>
          {row.map((_, cellIndex) => {
            const showPoint = blocksUp[rowIndex][cellIndex] === 0;
            return (
              <FieldBlock
                rowIndex={rowIndex}
                backgroundColor={
                  blocksUp[rowIndex][cellIndex] === null
                    ? THEME.colors.dark
                    : THEME.colors.orange
                }>
                {showPoint && <AllowedStep color={THEME.colors.dark} />}
              </FieldBlock>
            );
          })}
        </FieldRow>
      ))}

      <Text>???</Text>

      {blocksBottom.map((row, rowIndex) => (
        <FieldRow>
          {row.map((_, cellIndex) => {
            return (
              <FieldBlock
                rowIndex={rowIndex}
                backgroundColor={
                  blocksBottom[rowIndex][cellIndex] === null
                    ? THEME.colors.dark
                    : THEME.colors.orange
                }>
                {lastPointNumber === blocksBottom[rowIndex][cellIndex] && (
                  <AllowedStep color={THEME.colors.dark} />
                )}
              </FieldBlock>
            );
          })}
        </FieldRow>
      ))}
    </>
  );
};
