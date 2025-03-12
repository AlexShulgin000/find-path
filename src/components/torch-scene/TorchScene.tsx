import {Devvit} from "@devvit/public-api";
import {ImageTorch} from "../images/ImageTorch.js";
import {IImageProps} from "../images/images.types.js";

interface IMainBgProps extends IImageProps {
  children: JSX.Element;
}

export const TorchScene = ({children, appWidth}: IMainBgProps) => {
  return (
    <zstack width="100%" height="100%">
      <ImageTorch appWidth={appWidth} />
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        {children}
      </vstack>
    </zstack>
  );
};
