import {Devvit} from "@devvit/public-api";
import {THEME} from "../../../theme.js";

interface IAllowedStepProps {
  onPress?: () => void;
}

const size = `7px`;

export const AllowedStep = ({onPress}: IAllowedStepProps) => {
  return (
    <vstack
      onPress={onPress}
      cornerRadius="large"
      width={size}
      height={size}
      backgroundColor={THEME.colors.champagne}
    />
  );
};
