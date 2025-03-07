import {Devvit} from "@devvit/public-api";
import {THEME} from "../../../theme.js";
import type {SizeString} from "../../../types.js";

interface IFieldBlockProps {
    size?: SizeString;
}

export const FieldBlock = ({size = 40}: IFieldBlockProps) => {
    return (<vstack cornerRadius='small' width={size} height={size}
                    maxWidth='40px'
                    backgroundColor={THEME.colors.additionalLight}>
    </vstack>)
}
