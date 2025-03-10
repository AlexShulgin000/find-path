import {Devvit, useInterval, useState} from "@devvit/public-api";
import {IHeroPosition, IPageProps} from "../../types.js";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {Hero} from "./components/Hero.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";
import {THEME} from "../../theme.js";
import {useStateGeneric} from "../../hooks/useStateGeneric.js";

import {getHeroAllowedSteps} from "./game.utils.js";
import {Field} from "../../components/game-field/Field.js";
import {Text} from "../../components/text/Text.js";
import {
  EPage,
  GAME_DEMO_OPPONENT_NAME,
  GAME_DEMO_PATH,
  SCORE_MULTIPLIER,
} from "../../const.js";
import {getPostId, getPostUserTimeKey} from "../../utils.js";

enum ECheckStatus {
  idle = "idle",
  wait = "wait",
  success = "success",
  fail = "fail",
}

export const GamePage = ({
  onChangeActivePage,
  context,
  gameData,
  post,
  currentUser,
}: IPageProps) => {
  const path = gameData?.path ?? GAME_DEMO_PATH;
  const opponentName = gameData?.authorName ?? GAME_DEMO_OPPONENT_NAME;
  // TODO transfrom to Set with useStateGeneric ?
  const [passedPath, setPassedPath] = useState({}); // {"rowIndex.cellIndex": boolean}
  // TODO this about it, maybe use standart. not hack
  const [heroPosition, setHeroPosition] = useStateGeneric<IHeroPosition | null>(
    null,
  );
  const [checkingStatus, setCheckingStatus] = useState(ECheckStatus.idle);
  const heroAllowedSteps = getHeroAllowedSteps(path, heroPosition);
  const isLastRow = path.length - 1 === heroPosition?.rowIndex;
  const [time] = useState(Date.now());

  const finalCheckStep = useInterval(async () => {
    finalCheckStep.stop();
    if (checkingStatus === ECheckStatus.fail) {
      onChangeActivePage(EPage.gameFail);
    } else if (checkingStatus === ECheckStatus.success) {
      const passedTime = +((Date.now() - time) / 1000).toFixed(2);
      const score = SCORE_MULTIPLIER / passedTime;
      console.log(123, passedTime, score);
      const postId = getPostId(post);
      const userId = currentUser?.id;
      if (!userId) return;
      // TODO add ui loading?
      await context.redis.hSet(getPostUserTimeKey(postId, userId), {
        postId,
        userId,
        name: currentUser?.username,
        time: `${passedTime}`,
      });
      // TODO add request in leader table
      onChangeActivePage(EPage.gameVictory);
    } else {
      setCheckingStatus(ECheckStatus.idle);
    }
  }, 300);

  const firstCheckStep = useInterval(() => {
    firstCheckStep.stop();
    const success =
      heroPosition &&
      typeof path[heroPosition.rowIndex][heroPosition.cellIndex] === "number";
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

  const appWidth = context.dimensions?.width;
  const isDown633 = appWidth && appWidth <= 633;
  // TODO try to write text by vertically width each letter
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
    <Field>
      {heroPosition === null && (
        <vstack width="100%" alignment="middle center">
          <Hero />
        </vstack>
      )}
      {isDown515 ? null : (
        <>
          <vstack width="100%" padding="medium">
            <Text>You VS</Text>
            <spacer size="small" />
          </vstack>
          <vstack alignment="end" width="100%" padding="medium">
            <Text color={THEME.colors.blood}>{getName()}</Text>
          </vstack>
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
