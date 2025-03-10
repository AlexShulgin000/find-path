// Learn more at developers.reddit.com/docs
import {Devvit, Post, useAsync, User, useState} from "@devvit/public-api";
import {EPage, PAGES} from "./const.js";
import {Text} from "./components/text/Text.js";

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
    const {data, loading, error} = useAsync<User | undefined>(async () => {
      return await context.reddit.getCurrentUser();
    });
    const {data: post, loading: loadingPost} = useAsync<Post | undefined>(
      async () => {
        return await context.reddit.getPostById(context.postId ?? "");
      },
    );
    const authorId = post?.authorId;
    const {data: author, loading: authorLoading} = useAsync<User | undefined>(
      async () => {
        if (!authorId) return null;
        return await context.reddit.getUserById(authorId);
      },
      {
        depends: authorId,
      },
    );
    console.log(1111111);
    console.log(1, data);
    console.log(2, post?.authorId);
    console.log(3, author);

    const [activePage, setActivePage] = useState<EPage>(EPage.game);
    const Page = PAGES[activePage];

    // TODO create loading page
    if (!data || loading)
      return (
        <vstack width="100%" height="100%" alignment="middle center">
          <Text>Loading...</Text>
        </vstack>
      );
    return <Page onChangeActivePage={setActivePage} context={context} />;
  },
});

export default Devvit;
