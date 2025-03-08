import {Devvit} from "@devvit/public-api";
import {CELL_FULL_SIZE} from "../game.const.js";

export const Hero = () => {
  return (
    <image
      imageHeight={CELL_FULL_SIZE}
      imageWidth={CELL_FULL_SIZE}
      width={CELL_FULL_SIZE}
      height={CELL_FULL_SIZE}
      url="hero.png"
      description="Hero"
      resizeMode="cover"
    />
  );
};
