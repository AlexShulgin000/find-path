// Learn more at developers.reddit.com/docs
import {Devvit, useState} from "@devvit/public-api";
import {EPage, PAGES} from "./const.js";
import {Text} from "./components/text/Text.js";
import {useGetInitialData} from "./hooks/useGetInitialData.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// TODO add upload all images before start and cache them

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: "Add Find Path game",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const {reddit, ui} = context;
    ui.showToast(
      "Submitting your post - upon completion you'll navigate there.",
    );

    const subreddit = await reddit.getCurrentSubreddit();
    console.log(1, subreddit);
    const post = await reddit.submitPost({
      title: "My devvit post",
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading 123 ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: "Find Path!",
  height: "tall",
  render: context => {
    const {isError, isLoading, gameData, subreddit, currentUser, post} =
      useGetInitialData(context);

    const [activePage, setActivePage] = useState<EPage>(EPage.start);
    const Page =
      !!gameData && activePage === EPage.start
        ? PAGES[EPage.post]
        : PAGES[activePage];
    console.log(1, activePage, gameData);

    // TODO create loading page
    if (isError || isLoading)
      return (
        <vstack width="100%" height="100%" alignment="middle center">
          <Text>Loading 999...</Text>
        </vstack>
      );
    return (
      <Page
        onChangeActivePage={setActivePage}
        context={context}
        gameData={gameData}
        post={post}
        currentUser={currentUser}
        subreddit={subreddit}
      />
    );
  },
});

export default Devvit;
