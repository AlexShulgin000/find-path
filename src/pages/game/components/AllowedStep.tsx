import {Devvit, useInterval, useState} from "@devvit/public-api";
import {THEME} from "../../../theme.js";
import {SizeString} from "../../../types.js";


interface IAllowedStepProps {
    onPress?: () => void;
}

export const AllowedStep = ({onPress}: IAllowedStepProps) => {
    const [width, setWidth] = useState(7);
    const updateInterval = useInterval(() => {
        setWidth((prev) => {
            const value = prev + 1
            return value > 10 ? 7 : value
        });
    }, 200);
    // updateInterval.start();

    const size: SizeString = `${width}px`
  return <vstack onPress={onPress} cornerRadius='large' width={size} height={size} backgroundColor={THEME.colors.secondary} />
}
