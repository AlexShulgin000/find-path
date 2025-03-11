import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {DataService} from "../../services/DataService.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";
import {LoadingPage} from "../loading/LoadingPage.js";

export const GameStatFail = ({
  context,
  onChangeActivePage,
  gameData,
  currentUser,
}: IPageProps) => {
  const dataService = new DataService({context, gameData, currentUser});
  const {data: leaders} = useAsyncGeneric(async () => {
    return dataService.getPostLeaders();
  });
  const appWidth = context.dimensions?.width;
  const isDown470 = appWidth && appWidth <= 470;

  const handleCreatePath = () => {
    onChangeActivePage(EPage.createGame);
  };

  const handleRetry = () => {
    onChangeActivePage(EPage.showHiddenPath);
  };

  if (!leaders) {
    return <LoadingPage />;
  }
  return (
    <TorchScene>
      <Text size={5} color={THEME.colors.blood}>
        FAIL
      </Text>
      <Stat context={context} leaders={leaders} />
      {isDown470 ? (
        <>
          <hstack padding="small" width="100%">
            <Button onPress={handleCreatePath}>Create path</Button>
          </hstack>
          <hstack padding="small" width="100%">
            <Button onPress={handleRetry}>Retry</Button>
          </hstack>
        </>
      ) : (
        <hstack width="100%" padding="medium" gap="medium">
          <hstack width="50%">
            <Button onPress={handleCreatePath}>Create path</Button>
          </hstack>
          <hstack width="50%">
            <Button onPress={handleRetry}>Retry</Button>
          </hstack>
        </hstack>
      )}
    </TorchScene>
  );
};
