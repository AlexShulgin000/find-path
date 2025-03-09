import {Devvit} from "@devvit/public-api";

interface IMainBgProps {
  children: JSX.Element;
}

export const TorchScene = ({children}: IMainBgProps) => {
  return (
    <zstack width="100%" height="100%">
      <image
        imageHeight={576}
        imageWidth={768}
        height="100%"
        width="100%"
        url="start.jpg"
        description="Dark background"
        resizeMode="cover"
      />
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
