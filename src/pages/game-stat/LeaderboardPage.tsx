import {Text} from "../../components/text/Text.js";
import {Devvit} from "@devvit/public-api";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Stat} from "../../components/stat/Stat.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";
import {LoadingPage} from "../loading/LoadingPage.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";
import {LeadersDataService} from "../../services/LeadersDataService.js";

export const LeaderboardPage = ({
  context,
  onChangeActivePage,
  currentUser,
}: IPageProps) => {
  const {data: leaders, loading: leadersLoading} = useAsyncGeneric(async () => {
    return await LeadersDataService.getLeaderboard({context});
  });
  const {data: currentUserFromLeaders, loading: currentUserFromLeadersLoading} =
    useAsyncGeneric(async () => {
      return await LeadersDataService.getCurrentUserFromLeaderboard({
        currentUser,
        context,
      });
    });

  const appWidth = context.dimensions?.width;
  const isDown370 = appWidth && appWidth <= 370;

  if (leadersLoading || currentUserFromLeadersLoading) {
    return <LoadingPage appWidth={appWidth} />;
  }
  return (
    <TorchScene appWidth={appWidth}>
      <Text size={isDown370 ? 3 : 4}>Leaderboard</Text>
      <Stat
        context={context}
        leaders={leaders ?? []}
        currentUser={currentUserFromLeaders}
      />
      <hstack padding="small" width="100%">
        <Button onPress={() => onChangeActivePage(EPage.start)}>Back</Button>
      </hstack>
    </TorchScene>
  );
};
