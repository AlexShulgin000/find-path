import {Text} from "../../../components/text/Text.js";
import {THEME} from "../../../theme.js";
import {Devvit} from "@devvit/public-api";

interface IVerticalTextRightProps {
  opponentName: string;
}

export const VerticalTextRight = ({opponentName}: IVerticalTextRightProps) => {
  let right = `${opponentName.slice(0, 14)}`;

  return (
    <vstack alignment="end top" width="100%">
      <spacer size="small" />
      {right.split("").map(letter => (
        <>
          <spacer size="small" />
          <hstack>
            <Text color={THEME.colors.blood}>{letter}</Text>
            <spacer size="medium" />
          </hstack>
        </>
      ))}
    </vstack>
  );
};
