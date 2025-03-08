import {Devvit, useInterval, useState} from "@devvit/public-api";
import {IPageProps, TBlocks} from "../../types.js";
import {FieldRow} from "./components/FieldRow.js";
import {FieldBlock} from "./components/FieldBlock.js";
import {CELL_RADIUS} from "./game.const.js";
import {Hero} from "./components/Hero.js";
import {getHeroAllowedSteps} from "./game.utils.js";
import {AllowedStep} from "./components/AllowedStep.js";
import {THEME} from "../../theme.js";

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
  const [passedPath, setPassedPath] = useState({}); // {"row.cell": "row.cell"}
  const [heroPosition, setHeroPosition] = useState({rowIndex: 0, cellIndex: 0});
  const [checkingStatus, setCheckingStatus] = useState(ECheckStatus.idle);
  const heroAllowedSteps = getHeroAllowedSteps(testBlocks, heroPosition);

  const finalCheckStep = useInterval(() => {
    finalCheckStep.stop();
    if (checkingStatus === ECheckStatus.fail) {
      // show lose screen -> onChangeActivePage()
    } else {
      setCheckingStatus(ECheckStatus.idle);
    }
  }, 300);

  const firstCheckStep = useInterval(() => {
    firstCheckStep.stop();
    const success = !!testBlocks[heroPosition.rowIndex][heroPosition.rowIndex];
    setCheckingStatus(success ? ECheckStatus.success : ECheckStatus.fail);
    finalCheckStep.start();
  }, 600);

  const handleCellPress = (rowIndex: number, cellIndex: number) => {
    if (checkingStatus !== ECheckStatus.idle) return;
    setPassedPath(prev => ({...prev, [`${rowIndex}.${cellIndex}`]: true}));
    setCheckingStatus(ECheckStatus.wait);
    setHeroPosition({rowIndex, cellIndex});
    firstCheckStep.start();
  };

  const getBgCell = (isPassedCell: boolean, isHeroCell: boolean) => {
    if (isPassedCell) {
      return THEME.colors.primary;
    }
    if (isHeroCell) {
      switch (checkingStatus) {
        case ECheckStatus.success:
          return THEME.colors.secondary;
        case ECheckStatus.wait:
          return THEME.colors.primary;
        case ECheckStatus.fail:
          return THEME.colors.additionalDark;
        default:
          return THEME.colors.secondary;
      }
    }
    return THEME.colors.additionalLight;
  };

  return (
    <zstack width="100%" height="100%" alignment="top start">
      <image
        imageHeight={576}
        imageWidth={768}
        height="100%"
        width="100%"
        url="field.jpg"
        description="Dark game field"
        resizeMode="cover"
      />
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
              const cornerCellRadius =
                CELL_RADIUS[rowIndex as keyof typeof CELL_RADIUS];
              const isHeroCell =
                heroPosition.rowIndex === rowIndex &&
                heroPosition.cellIndex === cellIndex;
              const isCellHasAllowedStep =
                checkingStatus === ECheckStatus.idle &&
                heroAllowedSteps[rowIndex]?.has(cellIndex);
              const handlePress =
                isCellHasAllowedStep && !isHeroCell
                  ? () => handleCellPress(rowIndex, cellIndex)
                  : undefined;
              return (
                <FieldBlock
                  onPress={handlePress}
                  cornerRadius={cornerCellRadius}
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
    </zstack>
  );
};
