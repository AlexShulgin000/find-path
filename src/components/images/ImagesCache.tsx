import {Devvit} from "@devvit/public-api";

import {IMAGE_DESKTOP_NAMES, IMAGE_MOBILE_NAMES} from "../../const.js";
import {checkIsMobile} from "./images.utils.js";

interface IImageCacheProps {
  context: Devvit.Context;
}

/** Download images to cache them at the start of the game */
export const ImagesCache = ({context}: IImageCacheProps) => {
  const appWidth = context.dimensions?.width;
  const isMobile = checkIsMobile(appWidth);

  const images = appWidth
    ? isMobile
      ? IMAGE_MOBILE_NAMES
      : IMAGE_DESKTOP_NAMES
    : {...IMAGE_DESKTOP_NAMES, ...IMAGE_MOBILE_NAMES};

  return Object.values(images).map(name => (
    <image
      url={name}
      imageWidth={0}
      imageHeight={0}
      maxWidth={0}
      maxHeight={0}
    />
  ));
};
