import {Devvit} from "@devvit/public-api";
import {THEME} from "../../../theme.js";
import {ContainerCornerRadius} from "../../../types.js";

const CELL_FULL_SIZE = "60px";
const CELL_VISUAL_SIZE = "40px";
const HERO_VISUAL_SIZE = "60px";

interface IFieldBlockProps {
  cornerRadius?: ContainerCornerRadius;
  onPress?: () => void;
  isHero?: boolean;
}

export const FieldBlock = ({
  onPress,
  cornerRadius,
  isHero,
}: IFieldBlockProps) => {
  return (
    <zstack
      alignment="center middle"
      width={CELL_FULL_SIZE}
      height={CELL_FULL_SIZE}>
      <vstack
        borderColor={THEME.colors.additionalDark}
        border="thin"
        cornerRadius={cornerRadius}
        width={CELL_VISUAL_SIZE}
        height={CELL_VISUAL_SIZE}
        onPress={isHero ? undefined : onPress}
        backgroundColor={
          isHero ? THEME.colors.secondary : THEME.colors.additionalLight
        }></vstack>
      {isHero ? (
        <image
          imageHeight={HERO_VISUAL_SIZE}
          imageWidth={HERO_VISUAL_SIZE}
          width={HERO_VISUAL_SIZE}
          height={HERO_VISUAL_SIZE}
          url="hero.png"
          description="Hero"
          resizeMode="cover"
        />
      ) : null}
    </zstack>
  );
};
