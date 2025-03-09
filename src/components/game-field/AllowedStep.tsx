import {Devvit} from "@devvit/public-api";
import {THEME} from "../../theme.js";

interface IAllowedStepProps {
  onPress?: () => void;
  color?: string;
}

const size = `7px`;

export const AllowedStep = ({onPress, color}: IAllowedStepProps) => {
  return (
    <vstack
      onPress={onPress}
      cornerRadius="large"
      width={size}
      height={size}
      backgroundColor={color ?? THEME.colors.champagne}
    />
  );
};
