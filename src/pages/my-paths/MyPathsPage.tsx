import {Devvit} from "@devvit/public-api";
import {PostDataService} from "../../services/PostDataService.js";
import {useAsyncGeneric} from "../../hooks/useAsyncGeneric.js";
import {IPageProps} from "../../types.js";
import {LoadingPage} from "../loading/LoadingPage.js";
import {MyPath} from "./MyPath.js";
import {Text} from "../../components/text/Text.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Button} from "../../components/button/Button.js";
import {EPage} from "../../const.js";

export const MyPathsPage = ({
  context,
  currentUser,
  onChangeActivePage,
}: IPageProps) => {
  const {data: lastPosts, loading: lastPostsLoading} = useAsyncGeneric(
    async () => {
      return await PostDataService.getLastUserPosts({context, currentUser});
    },
  );
  console.log(123, lastPosts, lastPostsLoading);

  const handlePress = async (postId: string) => {
    const post = await context.reddit.getPostById(postId);
    context.ui.navigateTo(post);
  };

  if (lastPostsLoading) {
    return <LoadingPage appWidth={context.dimensions?.width} />;
  }
  return (
    <TorchScene appWidth={context.dimensions?.width}>
      {!lastPosts || !lastPosts.length ? (
        <vstack alignment="center">
          <Text>No paths yet</Text>
        </vstack>
      ) : (
        <vstack width="100%" alignment="center middle" padding="medium">
          <zstack alignment="center">
            <Text>My last paths</Text>
          </zstack>
          <spacer size="medium" />
          <hstack gap="small">
            {lastPosts.slice(0, 2).map(post => (
              <MyPath
                gameData={post}
                played={post.played}
                onPress={handlePress}
              />
            ))}
          </hstack>
          <hstack gap="small">
            {lastPosts.slice(2, 4).map(post => (
              <MyPath
                gameData={post}
                played={post.played}
                onPress={handlePress}
              />
            ))}
          </hstack>
        </vstack>
      )}
      <spacer size="medium" />
      <Button onPress={() => onChangeActivePage(EPage.start)}>Back</Button>
    </TorchScene>
  );
};
