// Learn more at developers.reddit.com/docs
import {Devvit} from "@devvit/public-api";
import {THEME} from "./theme.js";
import {Text} from "./components/text/Text.js";
import {Button} from "./components/button/Button.js";

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: "Add my post",
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
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: "Experience Post",
  // TODO А ЭТО ЧТО ?  height: 'tall',
  height: "regular",
  render: async (_context) => {
    const handleStart = () => {
      console.log(1);
    };

    const handleShowLeaderTable = () => {
      console.log(2);
    };

    return  (
      <zstack width="100%" height="100%" alignment="top start">
        <image
          imageHeight={576}
          imageWidth={768}
          height="100%"
          width="100%"
          url="start.jpg"
          description="Dark background"
          resizeMode="cover"
        />
        <vstack alignment="middle center" width="100%" height="100%">
          <hstack
            width="100%"
            height="20%"
            gap="small"
            alignment="center middle"
            padding="small">
            <hstack
              width="15px"
              height="60%"
              backgroundColor={THEME.colors.additionalLight}
              cornerRadius="medium"
            />
            <hstack
              width="25px"
              height="80%"
              backgroundColor={THEME.colors.additionalLight}
              cornerRadius="medium"
            />
            <hstack
              width="50px"
              height="80%"
              backgroundColor={THEME.colors.additionalDark}
              cornerRadius="small"
            />
            <hstack
              width="25px"
              height="80%"
              backgroundColor={THEME.colors.additionalLight}
              cornerRadius="medium"
            />
            <hstack
              width="15px"
              height="60%"
              backgroundColor={THEME.colors.additionalLight}
              cornerRadius="medium"
            />
          </hstack>
          <hstack height="20%" alignment="center" padding="medium">
            <Text size={4}>Find path</Text>
          </hstack>
          <vstack width="40%" gap="small">
            <Button onClick={handleStart}>Start</Button>
            <Button onClick={handleShowLeaderTable}>Show leaders</Button>
          </vstack>
        </vstack>
      </zstack>
    );
  },
});

export default Devvit;
