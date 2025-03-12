import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";
import {DataService} from "../../services/DataService.js";
import {LoadingPage} from "../loading/LoadingPage.js";

export const GameStatVictoryPage = ({
  context,
  onChangeActivePage,
  gameData,
  currentUser,
}: IPageProps) => {
  const dataService = new DataService({context, gameData, currentUser});
  const {data: leaders} = useAsyncGeneric(async () => {
    return await dataService.getPostLeaders();
  });
  const {data: currentUserFromLeaders, loading: currentUserFromLeadersLoading} =
    useAsyncGeneric(async () => {
      return await dataService.getCurrentUserFromPostLeaders();
    });

  const handleCreatePath = () => {
    onChangeActivePage(EPage.createGame);
  };

  if (!leaders || currentUserFromLeadersLoading) {
    return <LoadingPage />;
  }
  return (
    <TorchScene>
      <Text size={4} color={THEME.colors.champagne}>
        Victory!!!
      </Text>
      <Stat
        context={context}
        leaders={leaders}
        isTime
        currentUser={currentUserFromLeaders}
      />
      <hstack padding="small" width="100%">
        <Button onPress={handleCreatePath}>Create path</Button>
      </hstack>
    </TorchScene>
  );
};
