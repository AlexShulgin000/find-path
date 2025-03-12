// Learn more at developers.reddit.com/docs
import {Devvit, useState} from "@devvit/public-api";
import {EPage, GAME_DEMO_POST_KEY, PAGES} from "./const.js";
import {useGetInitialData} from "./hooks/useGetInitialData.js";
import {LoadingPage} from "./pages/loading/LoadingPage.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// TODO add upload all images before start and cache them
Devvit.addMenuItem({
  label: "Add Find Path game",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const {reddit, ui} = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: "Find Path!",
      subredditName: subreddit.name,
      preview: <LoadingPage />,
    });
    ui.navigateTo(post);
  },
});

// TODO check all pages and data with no reg user
Devvit.addCustomPostType({
  name: "Find Path!",
  height: "tall",
  render: context => {
    const {isError, isLoading, gameData, subreddit, currentUser} =
      useGetInitialData(context);

    const [activePage, setActivePage] = useState<EPage>(EPage.start);
    const Page =
      gameData?.postId !== GAME_DEMO_POST_KEY && activePage === EPage.start
        ? PAGES[EPage.post]
        : PAGES[activePage];
    // console.log(1, activePage, gameData);

    if (isError || isLoading || !gameData || !currentUser)
      return <LoadingPage />;
    return (
      <Page
        onChangeActivePage={setActivePage}
        context={context}
        gameData={gameData}
        currentUser={currentUser}
        subreddit={subreddit}
      />
    );
  },
});

export default Devvit;
