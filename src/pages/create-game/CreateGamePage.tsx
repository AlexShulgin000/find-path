import {Devvit, useState} from "@devvit/public-api";
import {TBlocks} from "../../types.js";
import {MAX_CELLS, MAX_ROWS} from "../../const.js";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";
import {THEME} from "../../theme.js";
import {getCreateGameAllowedSteps} from "./create-game.utils.js";
import {Field} from "../../components/game-field/Field.js";
import {Text} from "../../components/text/Text.js";
import {Button} from "../../components/button/Button.js";
import {checkIsLastRowField} from "../../utils.js";

const getEmptyBlocks = (): TBlocks =>
  new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_CELLS).fill(null));

export const CreateGamePage = () => {
  const [selectedPath, setSelectedPath] = useState<TBlocks>(getEmptyBlocks());
  const [step, setStep] = useState<null | number>(null);
  const allowedSteps = getCreateGameAllowedSteps(selectedPath, step);

  const handleCellPress = (newRowIndex: number, newCellIndex: number) => {
    const nextStep = step === null ? 0 : step + 1;
    setSelectedPath(prev =>
      prev.map((row, currentRowIndex) => {
        if (currentRowIndex === newRowIndex) {
          return row.map((cell, currentCellIndex) => {
            if (currentCellIndex === newCellIndex) {
              return nextStep;
            }
            return cell;
          });
        }
        return row;
      }),
    );
    setStep(nextStep);
  };

  const handleCreatePath = () => {
    // create. Show public your game and redirect to main page
  };

  const isLastRow = checkIsLastRowField(selectedPath);

  return (
    <Field>
      <hstack alignment="middle center" width="100%" padding="small">
        <Text>Create your path</Text>
      </hstack>
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        {selectedPath.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const allowedStep = allowedSteps[rowIndex]?.has(cellIndex);
              const handlePress = allowedStep
                ? () => handleCellPress(rowIndex, cellIndex)
                : undefined;
              const showFirstPoint = selectedPath[rowIndex][cellIndex] === 0;
              const showLastPoint =
                isLastRow && selectedPath[rowIndex][cellIndex] === step;
              return (
                <FieldBlock
                  onPress={handlePress}
                  rowIndex={rowIndex}
                  backgroundColor={
                    selectedPath[rowIndex][cellIndex] === null
                      ? THEME.colors.dark
                      : THEME.colors.orange
                  }>
                  {allowedStep && <AllowedStep onPress={handlePress} />}
                  {(showFirstPoint || showLastPoint) && (
                    <AllowedStep
                      onPress={handlePress}
                      color={THEME.colors.dark}
                    />
                  )}
                </FieldBlock>
              );
            })}
          </FieldRow>
        ))}
        <hstack alignment="middle center" padding="xsmall">
          <Button disabled={!isLastRow} onClick={handleCreatePath}>
            Create
          </Button>
        </hstack>
      </vstack>
    </Field>
  );
};
