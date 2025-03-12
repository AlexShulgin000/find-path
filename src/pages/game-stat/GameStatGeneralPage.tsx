import {Devvit} from "@devvit/public-api";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {IPageProps} from "../../types.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";
import {LoadingPage} from "../loading/LoadingPage.js";
import {LeadersDataService} from "../../services/LeadersDataService.js";

interface IGameStatGeneralPageProps extends IPageProps {
  text: JSX.Element;
  buttons: JSX.Element;
}

export const GameStatGeneralPage = ({
  text,
  buttons,
  context,
  currentUser,
}: IGameStatGeneralPageProps) => {
  const {data: leaders, loading: leadersLoading} = useAsyncGeneric(async () => {
    return LeadersDataService.getPostLeaders({context});
  });
  const {data: currentUserFromLeaders, loading: currentUserFromLeadersLoading} =
    useAsyncGeneric(async () => {
      return await LeadersDataService.getCurrentUserFromPostLeaders({
        context,
        currentUser,
      });
    });

  const appWidth = context.dimensions?.width;

  if (leadersLoading || currentUserFromLeadersLoading) {
    return <LoadingPage appWidth={appWidth} />;
  }
  return (
    <TorchScene appWidth={appWidth}>
      {text}
      <Stat
        context={context}
        leaders={leaders ?? []}
        isTime
        currentUser={currentUserFromLeaders}
      />
      {buttons}
    </TorchScene>
  );
};
