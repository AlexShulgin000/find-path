import {Devvit} from "@devvit/public-api";
import {THEME} from "../../../theme.js";
import {ContainerCornerRadius} from "../../../types.js";
import {CELL_FULL_SIZE} from "../game.const.js";

const CELL_VISUAL_SIZE = "40px";

interface IFieldBlockProps {
  cornerRadius?: ContainerCornerRadius;
  onPress?: () => void;
  isHero?: boolean;
  children?: JSX.Element;
}

export const FieldBlock = ({
  onPress,
  cornerRadius,
  isHero,
  children,
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
      {children ?? null}
    </zstack>
  );
};
