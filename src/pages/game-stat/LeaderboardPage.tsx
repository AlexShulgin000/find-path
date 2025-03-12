import {Text} from "../../components/text/Text.js";
import {Devvit} from "@devvit/public-api";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Stat} from "../../components/stat/Stat.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {DataService} from "../../services/DataService.js";
import {LoadingPage} from "../loading/LoadingPage.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";

export const LeaderboardPage = ({
  context,
  onChangeActivePage,
  gameData,
  currentUser,
}: IPageProps) => {
  const dataService = new DataService({context, gameData, currentUser});
  const {data: leaders} = useAsyncGeneric(async () => {
    return await dataService.getLeaderboard();
  });
  const {data: currentUserFromLeaders, loading: currentUserFromLeadersLoading} =
    useAsyncGeneric(async () => {
      return await dataService.getCurrentUserFromLeaderboard();
    });

  const appWidth = context.dimensions?.width;
  const isDown370 = appWidth && appWidth <= 370;

  if (!leaders || currentUserFromLeadersLoading) {
    return <LoadingPage appWidth={appWidth} />;
  }
  return (
    <TorchScene appWidth={appWidth}>
      <Text size={isDown370 ? 3 : 4}>Leaderboard</Text>
      <Stat
        context={context}
        leaders={leaders}
        currentUser={currentUserFromLeaders}
      />
      <hstack padding="small" width="100%">
        <Button onPress={() => onChangeActivePage(EPage.start)}>Back</Button>
      </hstack>
    </TorchScene>
  );
};
