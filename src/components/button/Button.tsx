import {Devvit} from "@devvit/public-api";
import {type SizeString} from "../../types.js";
import {Text} from "../text/Text.js";
import {THEME} from "../../theme.js";

interface IButtonPops {
  children: string;
  width?: SizeString;
  height?: SizeString;
  onClick?: () => void;
}

export const Button = ({
  children,
  width = "100%",
  height = "40px",
  onClick,
}: IButtonPops) => {
  return (
    <hstack
      height={height}
      width={width}
      alignment="center middle"
      padding="small"
      border="thick"
      borderColor={THEME.colors.blood}
      backgroundColor={THEME.colors.dark}
      onPress={onClick}>
      <Text>{children}</Text>
    </hstack>
  );
};
