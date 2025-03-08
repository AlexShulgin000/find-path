import {Devvit} from "@devvit/public-api";
import {THEME} from "../../../theme.js";
import {ContainerCornerRadius} from "../../../types.js";
import {CELL_FULL_SIZE, CELL_VISUAL_SIZE} from "../game.const.js";

interface IFieldBlockProps {
  cornerRadius?: ContainerCornerRadius;
  onPress?: () => void;
  children?: JSX.Element;
  backgroundColor?: string;
}

export const FieldBlock = ({
  onPress,
  cornerRadius,
  children,
  backgroundColor,
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
        onPress={onPress}
        backgroundColor={backgroundColor}
      />
      {children ?? null}
    </zstack>
  );
};
