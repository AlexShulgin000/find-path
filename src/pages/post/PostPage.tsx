import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {IPageProps, TBlocks} from "../../types.js";
import {THEME} from "../../theme.js";
import {Button} from "../../components/button/Button.js";
import {EPage, MAX_CELLS} from "../../const.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {HiddenPostPath} from "./components/HiddenPostPath.js";
import {ShownPostPath} from "./components/ShownPostPath.js";

export const PostPage = ({
  context,
  onChangeActivePage,
  gameData,
  completedGameData,
}: IPageProps) => {
  const path = gameData.path;
  const opponentName = gameData.authorName;
  const blocksUp: TBlocks = [path[0], new Array(MAX_CELLS).fill(null)];
  const blocksBottom: TBlocks = [
    new Array(MAX_CELLS).fill(null),
    path[path.length - 1],
  ];
  const lastPointNumber = blocksBottom[1]?.reduce((acc, cell) => {
    return (cell ?? 0) > (acc ?? 0) ? cell : acc;
  }, null);
  const appWidth = context.dimensions?.width;
  const isDown420 = appWidth && appWidth <= 420;

  const getName = () => {
    if (isDown420 && opponentName.length >= 16) {
      return `${opponentName.slice(0, 16)}...`;
    }
    if (opponentName.length >= 24) {
      return `${opponentName.slice(0, 24)}...`;
    }
    return opponentName;
  };

  const handelGuessPress = () => {
    onChangeActivePage(EPage.showHiddenPath);
  };

  const handelShowLeaders = () => {
    onChangeActivePage(EPage.postLeaders);
  };

  const handelCreate = () => {
    onChangeActivePage(EPage.createGame);
  };

  const rank = completedGameData?.rank ?? 0;
  const score = completedGameData?.score ?? 0;
  return (
    <TorchScene appWidth={appWidth}>
      {completedGameData ? (
        <vstack padding="medium" alignment="middle center">
          <Text>You guessed path of</Text>
          <spacer size="small" />
          <Text color={THEME.colors.blood}>{getName()}</Text>
          <spacer size="small" />
          <hstack>
            <Text>Your place is</Text>
            <spacer size="small" />
            <Text
              color={
                THEME.colors.orange
              }>{`${rank > 999999 ? "999999+" : rank}`}</Text>
          </hstack>
          <spacer size="small" />
          <hstack alignment="bottom">
            <Text>With time</Text>
            <spacer size="small" />
            <Text
              color={
                THEME.colors.orange
              }>{`${score > 99999 ? "99999+" : score}`}</Text>
            <Text color={THEME.colors.orange} size={1.5}>{`s`}</Text>
          </hstack>
        </vstack>
      ) : (
        <vstack padding="medium" alignment="middle center">
          <Text>Try to guess</Text>
          <spacer size="small" />
          <Text color={THEME.colors.blood}>{getName()}</Text>
          <spacer size="small" />
          <Text>path!</Text>
        </vstack>
      )}

      {completedGameData ? (
        <ShownPostPath path={path} lastPointNumber={lastPointNumber} />
      ) : (
        <HiddenPostPath
          blocksUp={blocksUp}
          blocksBottom={blocksBottom}
          lastPointNumber={lastPointNumber}
        />
      )}

      <vstack padding="medium" gap="small">
        {completedGameData ? (
          <Button onPress={handelCreate}>Create path</Button>
        ) : (
          <Button onPress={handelGuessPress}>Guess</Button>
        )}

        <Button onPress={handelShowLeaders}>Leaders</Button>
      </vstack>
    </TorchScene>
  );
};
