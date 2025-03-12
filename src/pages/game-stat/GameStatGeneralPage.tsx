import {Devvit} from "@devvit/public-api";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {IPageProps} from "../../types.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";
import {DataService} from "../../services/DataService.js";
import {LoadingPage} from "../loading/LoadingPage.js";

interface IGameStatGeneralPageProps extends IPageProps {
  text: JSX.Element;
  buttons: JSX.Element;
}

export const GameStatGeneralPage = ({
  text,
  buttons,
  context,
  gameData,
  currentUser,
}: IGameStatGeneralPageProps) => {
  const dataService = new DataService({context, gameData, currentUser});
  const {data: leaders, loading: leadersLoading} = useAsyncGeneric(async () => {
    return await dataService.getPostLeaders();
  });
  const {data: currentUserFromLeaders, loading: currentUserFromLeadersLoading} =
    useAsyncGeneric(async () => {
      return await dataService.getCurrentUserFromPostLeaders();
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
