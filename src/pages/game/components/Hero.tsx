import {Devvit} from "@devvit/public-api";
import {CELL_FULL_SIZE} from "../game.const.js";
import {IMAGE_DESKTOP_NAMES} from "../../../const.js";

export const Hero = () => {
  return (
    <image
      imageHeight={CELL_FULL_SIZE}
      imageWidth={CELL_FULL_SIZE}
      width={CELL_FULL_SIZE}
      height={CELL_FULL_SIZE}
      url={IMAGE_DESKTOP_NAMES.hero}
      description="Hero"
      resizeMode="cover"
    />
  );
};
