import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {GameStatGeneralPage} from "./GameStatGeneralPage.js";

export const GameStatPostLeaders = ({
  onChangeActivePage,
  ...props
}: IPageProps) => {
  const handleCreatePath = () => {
    onChangeActivePage(EPage.post);
  };

  return (
    <GameStatGeneralPage
      {...props}
      onChangeActivePage={onChangeActivePage}
      text={
        <Text size={2.6} color={THEME.colors.champagne}>
          Path leaders
        </Text>
      }
      buttons={
        <hstack padding="small" width="100%">
          <Button onPress={handleCreatePath}>Back</Button>
        </hstack>
      }
    />
  );
};
