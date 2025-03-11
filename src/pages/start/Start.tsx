import {THEME} from "../../theme.js";
import {Text} from "../../components/text/Text.js";
import {Button} from "../../components/button/Button.js";
import {Devvit} from "@devvit/public-api";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";

export const StartPage = ({onChangeActivePage}: IPageProps) => {
  const handleGuess = () => {
    onChangeActivePage(EPage.showHiddenPath);
  };

  const handleCreate = () => {
    onChangeActivePage(EPage.createGame);
  };

  const handleShowLeaderTable = () => {
    console.log("add table");
  };

  return (
    <TorchScene>
      <hstack
        width="100%"
        height="20%"
        gap="small"
        alignment="center middle"
        padding="small">
        <hstack
          width="15px"
          height="60%"
          backgroundColor={THEME.colors.orange}
          cornerRadius="medium"
        />
        <hstack
          width="25px"
          height="80%"
          backgroundColor={THEME.colors.orange}
          cornerRadius="medium"
        />
        <hstack
          width="50px"
          height="80%"
          backgroundColor={THEME.colors.blood}
          cornerRadius="small"
        />
        <hstack
          width="25px"
          height="80%"
          backgroundColor={THEME.colors.orange}
          cornerRadius="medium"
        />
        <hstack
          width="15px"
          height="60%"
          backgroundColor={THEME.colors.orange}
          cornerRadius="medium"
        />
      </hstack>
      <hstack height="20%" alignment="center" padding="medium">
        <Text size={4}>Find path</Text>
      </hstack>
      <vstack width="40%" gap="small" minWidth="240px">
        <Button onPress={handleGuess}>Guess</Button>
        <Button onPress={handleCreate}>Create</Button>
        <Button onPress={handleShowLeaderTable}>Leaderboard</Button>
      </vstack>
    </TorchScene>
  );
};
