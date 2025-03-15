import {Devvit} from "@devvit/public-api";
import {THEME} from "../../theme.js";
import {ContainerCornerRadius, SizeString} from "../../types.js";
import {CELL_FULL_SIZE, CELL_VISUAL_SIZE} from "../../pages/game/game.const.js";

export const CELL_RADIUS: Record<number, ContainerCornerRadius> = {
  0: "small",
  1: "medium",
  2: "small",
  3: "medium",
  4: "small",
  5: "medium",
  6: "large",
};

interface IFieldBlockProps {
  rowIndex: number;
  onPress?: () => void;
  children?: JSX.Element;
  backgroundColor?: string;
  width?: SizeString;
  height?: SizeString;
  innerWidth?: SizeString;
  innerHeight?: SizeString;
}

export const FieldBlock = ({
  onPress,
  rowIndex,
  children,
  backgroundColor,
  width = CELL_FULL_SIZE,
  height = CELL_FULL_SIZE,
  innerWidth = CELL_VISUAL_SIZE,
  innerHeight = CELL_VISUAL_SIZE,
}: IFieldBlockProps) => {
  return (
    <zstack alignment="center middle" width={width} height={height}>
      <zstack
        borderColor={THEME.colors.blood}
        border="thin"
        cornerRadius={CELL_RADIUS[rowIndex]}
        width={innerWidth}
        height={innerHeight}
        onPress={onPress}
        backgroundColor={backgroundColor}
      />
      {children ?? null}
    </zstack>
  );
};
