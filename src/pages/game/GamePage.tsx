import {Devvit, useInterval, useState} from "@devvit/public-api";
import {IHeroPosition, IPageProps, TBlocks} from "../../types.js";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {Hero} from "./components/Hero.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";
import {THEME} from "../../theme.js";
import {useStateGeneric} from "../../hooks/useStateGeneric.js";

import {getHeroAllowedSteps} from "./game.utils.js";
import {Field} from "../../components/game-field/Field.js";

// x | | |
// x x x |
// | | x |
// | x x |
// x x | |
// x x x |
// | | x x
const testBlocks: TBlocks = [
  [0, null, null, null],
  [1, 2, 3, null],
  [null, null, 4, null],
  [null, 6, 5, null],
  [8, 7, null, null],
  [9, 10, 11, null],
  [null, null, 12, 13],
];

enum ECheckStatus {
  idle = "idle",
  wait = "wait",
  success = "success",
  fail = "fail",
}

export const GamePage = ({onChangeActivePage}: IPageProps) => {
  // TODO transfrom to Set with useStateGeneric ?
  const [passedPath, setPassedPath] = useState({}); // {"rowIndex.cellIndex": boolean}
  // TODO this about it, maybe use standart. not hack
  const [heroPosition, setHeroPosition] = useStateGeneric<IHeroPosition | null>(
    null,
  );
  const [checkingStatus, setCheckingStatus] = useState(ECheckStatus.idle);
  const heroAllowedSteps = getHeroAllowedSteps(testBlocks, heroPosition);
  const isLastRow = testBlocks.length - 1 === heroPosition?.rowIndex;

  const finalCheckStep = useInterval(() => {
    finalCheckStep.stop();
    if (checkingStatus === ECheckStatus.fail) {
      // add fail timer 300 ->  show lose screen -> onChangeActivePage()
    } else {
      setCheckingStatus(ECheckStatus.idle);
    }
  }, 300);

  const firstCheckStep = useInterval(() => {
    firstCheckStep.stop();
    const success =
      heroPosition &&
      typeof testBlocks[heroPosition.rowIndex][heroPosition.cellIndex] ===
        "number";
    setCheckingStatus(success ? ECheckStatus.success : ECheckStatus.fail);
    finalCheckStep.start();
  }, 600);

  const handleCellPress = (rowIndex: number, cellIndex: number) => {
    if (checkingStatus !== ECheckStatus.idle || isLastRow) return;
    heroPosition &&
      setPassedPath(prev => ({
        ...prev,
        [`${heroPosition.rowIndex}.${heroPosition.cellIndex}`]: true,
      }));
    setCheckingStatus(ECheckStatus.wait);
    setHeroPosition({rowIndex, cellIndex});
    firstCheckStep.start();
  };

  const getBgCell = (isPassedCell: boolean, isHeroCell: boolean) => {
    if (isPassedCell) {
      return THEME.colors.orange;
    }
    if (isHeroCell) {
      switch (checkingStatus) {
        case ECheckStatus.success:
          return THEME.colors.orange;
        case ECheckStatus.wait:
          return THEME.colors.champagne;
        case ECheckStatus.fail:
          return THEME.colors.blood;
        default:
          return THEME.colors.orange;
      }
    }
    return THEME.colors.dark;
  };

  return (
    <Field>
      {heroPosition === null && (
        <vstack width="100%" alignment="middle center">
          <Hero />
        </vstack>
      )}
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        {testBlocks.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const isPassedCell =
                !!passedPath[
                  `${rowIndex}.${cellIndex}` as keyof typeof passedPath
                ];
              const isHeroCell =
                heroPosition?.rowIndex === rowIndex &&
                heroPosition?.cellIndex === cellIndex;
              const isCellHasAllowedStep =
                isLastRow ||
                (heroPosition === null && rowIndex === 0) ||
                (checkingStatus === ECheckStatus.idle &&
                  heroAllowedSteps[rowIndex]?.has(cellIndex));
              const handlePress =
                isCellHasAllowedStep && !isHeroCell
                  ? () => handleCellPress(rowIndex, cellIndex)
                  : undefined;
              return (
                <FieldBlock
                  onPress={handlePress}
                  rowIndex={rowIndex}
                  backgroundColor={getBgCell(isPassedCell, isHeroCell)}>
                  <>
                    {!isHeroCell && isCellHasAllowedStep && (
                      <AllowedStep onPress={handlePress} />
                    )}
                    {isHeroCell && <Hero />}
                  </>
                </FieldBlock>
              );
            })}
          </FieldRow>
        ))}
      </vstack>
    </Field>
  );
};
