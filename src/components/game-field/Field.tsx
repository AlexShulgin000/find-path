import {Devvit} from "@devvit/public-api";

interface IFieldProps {
  children: JSX.Element;
}

export const Field = ({children}: IFieldProps) => {
  return (
    <zstack width="100%" height="100%" alignment="top start">
      <image
        imageHeight={576}
        imageWidth={768}
        height="100%"
        width="100%"
        url="field.jpg"
        description="Dark game field"
        resizeMode="cover"
      />
      {children}
    </zstack>
  );
};
