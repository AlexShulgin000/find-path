import {Text} from "../../../components/text/Text.js";
import {Devvit} from "@devvit/public-api";

export const VerticalTextLeft = () => {
  const left = "You VS";

  return (
    <vstack alignment="start top">
      <spacer size="small" />
      {left.split("").map(letter => (
        <>
          <spacer size="small" />
          <hstack>
            <spacer size="medium" />
            <Text>{letter}</Text>
          </hstack>
        </>
      ))}
    </vstack>
  );
};
