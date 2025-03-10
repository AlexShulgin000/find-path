import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";

export const GameStatVictory = ({context, onChangeActivePage}: IPageProps) => {
  const handleCreatePath = () => {
    onChangeActivePage(EPage.createGame);
  };

  return (
    <TorchScene>
      <Text size={5} color={THEME.colors.champagne}>
        Victory!!!
      </Text>
      <Stat context={context} />
      <hstack padding="small" width="100%">
        <Button onPress={handleCreatePath}>Create path</Button>
      </hstack>
    </TorchScene>
  );
};
