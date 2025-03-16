import {Devvit, useInterval, useState} from "@devvit/public-api";
import {IHeroPosition, IPageProps, TBlock} from "../../types.js";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {Hero} from "./components/Hero.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";
import {THEME} from "../../theme.js";
import {useStateGeneric} from "../../hooks/useStateGeneric.js";

import {getHeroAllowedSteps} from "./game.utils.js";
import {Field} from "../../components/game-field/Field.js";
import {Text} from "../../components/text/Text.js";
import {EPage, SCORE_MULTIPLIER} from "../../const.js";
import {VerticalTextLeft} from "./components/VerticalTextLeft.js";
import {VerticalTextRight} from "./components/VerticalTextRight.js";
import {LeadersDataService} from "../../services/LeadersDataService.js";

enum ECheckStatus {
  idle = "idle",
  wait = "wait",
  success = "success",
  victory = "victory",
  fail = "fail",
}

export const GamePage = ({
  onChangeActivePage,
  context,
  gameData,
  currentUser,
}: IPageProps) => {
  const path = gameData.path;
  const opponentName = gameData?.authorName;
  const [passedPath, setPassedPath] = useStateGeneric<Record<string, TBlock>>(
    {},
  ); // {"rowIndex.cellIndex": pathNumber | null}
  const [heroPosition, setHeroPosition] = useStateGeneric<IHeroPosition | null>(
    null,
  );
  const [checkingStatus, setCheckingStatus] = useState(ECheckStatus.idle);
  const heroAllowedSteps = getHeroAllowedSteps(path, heroPosition, passedPath);
  const [time] = useState(Date.now());

  const handleSuccess = async () => {
    const finalStep = path[path.length - 1].reduce(
      (acc, cell) => ((cell ?? 0) > (acc ?? 0) ? cell : acc),
      0,
    );
    if (
      heroPosition &&
      finalStep === path[heroPosition.rowIndex][heroPosition?.cellIndex]
    ) {
      setCheckingStatus(ECheckStatus.victory);
      const passedTime = +((Date.now() - time) / 1000).toFixed(2);
      const score = +(SCORE_MULTIPLIER / passedTime).toFixed(2);
      await Promise.all([
        LeadersDataService.setUserVictoryPost(
          {currentUser, context},
          {time: passedTime},
        ),
        LeadersDataService.increaseUserVictoryLeaderboard(
          {context, currentUser},
          {score},
        ),
      ]);
      onChangeActivePage(EPage.gameVictory);
    } else {
      setCheckingStatus(ECheckStatus.idle);
    }
  };

  const finalCheckStep = useInterval(async () => {
    finalCheckStep.stop();
    if (checkingStatus === ECheckStatus.fail) {
      onChangeActivePage(EPage.gameFail);
    } else if (checkingStatus === ECheckStatus.success) {
      await handleSuccess();
    } else {
      setCheckingStatus(ECheckStatus.idle);
    }
  }, 200);

  const firstCheckStep = useInterval(() => {
    firstCheckStep.stop();
    const currentNum = heroPosition
      ? path[heroPosition.rowIndex][heroPosition.cellIndex]
      : null;
    const prevNum = Object.values(passedPath).reduce(
      (acc, num) => ((num ?? 0) > (acc ?? 0) ? num : acc),
      0,
    );
    const isNextNumAfterPrev =
      typeof currentNum === "number" && typeof prevNum === "number"
        ? currentNum === prevNum + 1
        : false;
    const isFirstValidStep =
      Object.values(passedPath).length === 0 &&
      typeof currentNum === "number" &&
      currentNum === 0;
    setCheckingStatus(
      isNextNumAfterPrev || isFirstValidStep
        ? ECheckStatus.success
        : ECheckStatus.fail,
    );
    finalCheckStep.start();
  }, 400);

  const handleCellPress = (rowIndex: number, cellIndex: number) => {
    if (checkingStatus !== ECheckStatus.idle) return;
    heroPosition &&
      setPassedPath(prev => ({
        ...prev,
        [`${heroPosition.rowIndex}.${heroPosition.cellIndex}`]:
          path[heroPosition.rowIndex][heroPosition.cellIndex],
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

  const appWidth = context.dimensions?.width;
  const isDown633 = appWidth && appWidth <= 633;
  const isDown515 = appWidth && appWidth <= 515;
  const getName = () => {
    if (isDown633 && opponentName.length >= 14) {
      return `${opponentName.slice(0, 14)}...`;
    }
    if (opponentName.length >= 18) {
      return `${opponentName.slice(0, 18)}...`;
    }
    return opponentName;
  };

  return (
    <Field appWidth={context.dimensions?.width}>
      {heroPosition === null && (
        <vstack width="100%" alignment="top center">
          <Hero />
        </vstack>
      )}
      {isDown515 ? (
        <>
          <VerticalTextLeft />
          <VerticalTextRight opponentName={opponentName} />
        </>
      ) : (
        <>
          <hstack width="100%" padding="medium" alignment="start">
            <Text>You VS</Text>
          </hstack>
          <hstack alignment="end" width="100%" padding="medium">
            <Text color={THEME.colors.blood}>{getName()}</Text>
          </hstack>
        </>
      )}
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        {path.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const isPassedCell =
                passedPath[
                  `${rowIndex}.${cellIndex}` as keyof typeof passedPath
                ] != undefined;
              const isHeroCell =
                heroPosition?.rowIndex === rowIndex &&
                heroPosition?.cellIndex === cellIndex;
              const isCellHasAllowedStep =
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
      {checkingStatus === ECheckStatus.victory && (
        <vstack
          width="100%"
          height="100%"
          padding="small"
          alignment="center bottom">
          <Text color={THEME.colors.champagne}>VICTORY</Text>
        </vstack>
      )}
    </Field>
  );
};
