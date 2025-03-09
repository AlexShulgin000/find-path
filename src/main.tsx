// Learn more at developers.reddit.com/docs
import {Devvit, useState} from "@devvit/public-api";
import {EPage, PAGES} from "./const.js";

Devvit.configure({
  redditAPI: true,
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
    const [activePage, setActivePage] = useState<EPage>(EPage.gameVictory);
    const Page = PAGES[activePage];

    return <Page onChangeActivePage={setActivePage} context={context} />;
  },
});

export default Devvit;
