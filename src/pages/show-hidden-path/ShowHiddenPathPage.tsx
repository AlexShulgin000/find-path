import {Field} from "../../components/game-field/Field.js";
import {Devvit, useInterval, useState} from "@devvit/public-api";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {THEME} from "../../theme.js";
import {IPageProps} from "../../types.js";
import {checkIsLastRowField} from "../../utils.js";
import {EPage} from "../../const.js";
import {Text} from "../../components/text/Text.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";

const INITIAL_COUNTER = 10;

export const ShowHiddenPathPage = ({
  onChangeActivePage,
  gameData,
}: IPageProps) => {
  const path = gameData.path;
  const lastStep = path[path.length - 1].reduce((acc, cell) => {
    return cell && cell > (acc ?? 0) ? cell : acc;
  }, null);
  const [counter, setCounter] = useState(INITIAL_COUNTER);

  const counterTimer = useInterval(() => {
    const nextValue = counter - 1;
    setCounter(nextValue);
    if (nextValue === 0) {
      counterTimer.stop();
      onChangeActivePage(EPage.game);
    }
  }, 1000);

  counter === INITIAL_COUNTER && counterTimer.start();

  const isLastRow = checkIsLastRowField(path);
  return (
    <Field>
      <vstack
        grow
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        <hstack width="100%" padding="medium" alignment="middle center">
          <Text>Remember path!</Text>
        </hstack>
        {path.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const showFirstPoint = path[rowIndex][cellIndex] === 0;
              const showLastPoint =
                isLastRow && path[rowIndex][cellIndex] === lastStep;
              return (
                <FieldBlock
                  rowIndex={rowIndex}
                  backgroundColor={
                    path[rowIndex][cellIndex] === null
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
        <hstack width="100%" padding="medium" alignment="middle center">
          <Text size={3}>{`${counter}`}</Text>
        </hstack>
      </vstack>
      )
    </Field>
  );
};
