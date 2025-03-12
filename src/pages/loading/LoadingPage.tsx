import {Text} from "../../components/text/Text.js";
import {Devvit} from "@devvit/public-api";
import {ImageTorch} from "../../components/images/ImageTorch.js";
import {IImageProps} from "../../components/images/images.types.js";

export const LoadingPage = ({appWidth}: IImageProps) => {
  return (
    <zstack width="100%" height="100%">
      <ImageTorch appWidth={appWidth} />
      <vstack width="100%" height="100%" alignment="middle center">
        <Text>Loading...</Text>
      </vstack>
    </zstack>
  );
};
