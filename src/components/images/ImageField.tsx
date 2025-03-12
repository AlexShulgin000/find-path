import {Devvit} from "@devvit/public-api";
import {IImageProps} from "./images.types.js";
import {checkIsMobile} from "./images.utils.js";
import {IMAGE_DESKTOP_NAMES, IMAGE_MOBILE_NAMES} from "../../const.js";

export const ImageField = ({appWidth}: IImageProps) => {
  const isMobile = checkIsMobile(appWidth);
  return (
    <image
      imageHeight={576}
      imageWidth={isMobile ? 340 : 768}
      height="100%"
      width="100%"
      url={
        isMobile ? IMAGE_MOBILE_NAMES.fieldMobile : IMAGE_DESKTOP_NAMES.field
      }
      description="Dark game field"
      resizeMode="cover"
    />
  );
};
