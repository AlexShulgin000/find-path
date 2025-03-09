import {Devvit} from "@devvit/public-api";
import {type SizeString} from "../../types.js";
import {Text} from "../text/Text.js";
import {THEME} from "../../theme.js";

interface IButtonPops {
  children: string;
  width?: SizeString;
  height?: SizeString;
  onPress?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  width = "100%",
  height = "40px",
  onPress,
  disabled,
}: IButtonPops) => {
  return (
    <hstack
      height={height}
      width={width}
      alignment="center middle"
      padding="small"
      border="thick"
      borderColor={disabled ? THEME.colorsDisabled.blood : THEME.colors.blood}
      backgroundColor={disabled ? THEME.colorsDisabled.dark : THEME.colors.dark}
      onPress={disabled ? undefined : onPress}>
      <Text color={disabled ? THEME.colorsDisabled.champagne : undefined}>
        {children}
      </Text>
    </hstack>
  );
};
