import {Devvit} from "@devvit/public-api";
import {ImageField} from "../images/ImageField.js";
import {IImageProps} from "../images/images.types.js";

interface IFieldProps extends IImageProps {
  children: JSX.Element;
}

export const Field = ({children, appWidth}: IFieldProps) => {
  return (
    <zstack width="100%" height="100%">
      <ImageField appWidth={appWidth} />
      {children}
    </zstack>
  );
};
