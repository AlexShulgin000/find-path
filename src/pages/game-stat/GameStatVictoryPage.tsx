import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {GameStatGeneralPage} from "./GameStatGeneralPage.js";

export const GameStatVictoryPage = ({
  onChangeActivePage,
  ...props
}: IPageProps) => {
  const handleCreatePath = () => {
    onChangeActivePage(EPage.createGame);
  };

  const handleImprove = () => {
    onChangeActivePage(EPage.showHiddenPath);
  };

  return (
    <GameStatGeneralPage
      {...props}
      onChangeActivePage={onChangeActivePage}
      text={
        <Text size={4} color={THEME.colors.champagne}>
          Victory!!!
        </Text>
      }
      buttons={
        <hstack width="100%" padding="small" gap="medium">
          <hstack width="50%">
            <Button onPress={handleCreatePath}>Create path</Button>
          </hstack>
          <hstack width="50%">
            <Button onPress={handleImprove}>Improve</Button>
          </hstack>
        </hstack>
      }
    />
  );
};
