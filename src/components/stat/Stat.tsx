import {Devvit} from "@devvit/public-api";
import {Text} from "../text/Text.js";
import {THEME} from "../../theme.js";

const leaders = [
  {id: 1, name: "Jar Hilo", time: 12},
  {id: 2, name: "Hert Jiopqwww", time: 16.5},
];

export const Stat = () => {
  return (
    <vstack width="100%" padding="medium">
      {leaders.map((leader, i) => (
        <>
          <spacer size="small" />
          <hstack width="100%" padding="medium" backgroundColor={"white"}>
            <hstack>
              <Text
                color={THEME.colors.dark}>{`${i + 1}. ${leader.name}`}</Text>
            </hstack>
            <hstack alignment="end bottom" grow>
              <Text color={THEME.colors.dark}>{`${leader.time}`}</Text>
              <hstack width="3px" />
              <Text color={THEME.colors.dark} size={1.5}>{`s`}</Text>
            </hstack>
          </hstack>
        </>
      ))}
    </vstack>
  );
};
