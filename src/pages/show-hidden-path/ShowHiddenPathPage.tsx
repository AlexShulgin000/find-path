import {Field} from "../../components/game-field/Field.js";
import {Devvit, useInterval, useState} from "@devvit/public-api";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {THEME} from "../../theme.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";
import {TBlocks} from "../../types.js";
import {checkIsLastRowField} from "../../utils.js";
import {Text} from "../../components/text/Text.js";

const testBlocks: TBlocks = [
  [0, null, null, null],
  [1, 2, 3, null],
  [null, null, 4, null],
  [null, 6, 5, null],
  [8, 7, null, null],
  [9, 10, 11, null],
  [null, null, 12, 13],
];

const INITIAL_COUNTER = 10;

export const ShowHiddenPathPage = () => {
  const blocks = testBlocks;
  const lastStep = testBlocks[testBlocks.length - 1].reduce((acc, cell) => {
    return cell && cell > (acc ?? 0) ? cell : acc;
  }, null);
  const [counter, setCounter] = useState(INITIAL_COUNTER);

  const counterTimer = useInterval(() => {
    const nextValue = counter - 1;
    setCounter(nextValue);
    if (nextValue === 0) {
      counterTimer.stop();
      //     redirect
    }
  }, 1000);

  counter === INITIAL_COUNTER && counterTimer.start();

  const isLastRow = checkIsLastRowField(blocks);
  return (
    <Field>
      <hstack width="100%" padding="medium" alignment="middle center">
        <Text>{`${counter}`}</Text>
      </hstack>
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        {blocks.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const showFirstPoint = blocks[rowIndex][cellIndex] === 0;
              const showLastPoint =
                isLastRow && blocks[rowIndex][cellIndex] === lastStep;
              return (
                <FieldBlock
                  rowIndex={rowIndex}
                  backgroundColor={
                    blocks[rowIndex][cellIndex] === null
                      ? THEME.colors.dark
                      : THEME.colors.orange
                  }>
                  {(showFirstPoint || showLastPoint) && (
                    <AllowedStep color={THEME.colors.dark} />
                  )}
                </FieldBlock>
              );
            })}
          </FieldRow>
        ))}
      </vstack>
      )
    </Field>
  );
};
