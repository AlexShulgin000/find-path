import {Text} from "../../components/text/Text.js";
import {Devvit} from "@devvit/public-api";

export const LoadingPage = () => {
  return (
    <zstack width="100%" height="100%">
      {/*  TODO Create component with this image */}
      <image
        imageHeight={576}
        imageWidth={768}
        height="100%"
        width="100%"
        url="start.jpg"
        description="Dark background"
        resizeMode="cover"
      />
      <vstack width="100%" height="100%" alignment="middle center">
        <Text>Loading...</Text>
      </vstack>
    </zstack>
  );
};
