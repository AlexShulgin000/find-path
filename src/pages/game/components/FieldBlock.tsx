import {Devvit} from "@devvit/public-api";
import {THEME} from "../../../theme.js";
import {ContainerCornerRadius, SizeString} from "../../../types.js";

const DEFAULT_SIZE = 40;

interface IFieldBlockProps {
  size?: SizeString;
  cornerRadius?: ContainerCornerRadius;
  onPress?: () => void;
}

export const FieldBlock = ({
  size = "40px",
  onPress,
  cornerRadius,
}: IFieldBlockProps) => {
  return (
    <vstack
      cornerRadius={cornerRadius}
      width={size}
      height={size}
      minWidth={`${DEFAULT_SIZE}px`}
      minHeight={`${DEFAULT_SIZE}px`}
      onPress={onPress}
      backgroundColor={THEME.colors.additionalLight}></vstack>
  );
};
