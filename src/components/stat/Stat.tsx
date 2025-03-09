import {Devvit} from "@devvit/public-api";
import {Text} from "../text/Text.js";
import {THEME} from "../../theme.js";

const leaders = [
  {id: 1, name: "Jar Hilo", time: 12},
  {id: 2, name: "Hert JiopqwwwHert Jiopqw1", time: 16.5},
];

interface IStatProps {
  context: Devvit.Context;
}

export const Stat = ({context}: IStatProps) => {
  const appWidth = context.dimensions?.width;
  const isDown570 = appWidth && appWidth <= 570;
  const isDown470 = appWidth && appWidth <= 470;
  const isDown420 = appWidth && appWidth <= 420;
  const isDown320 = appWidth && appWidth <= 320;

  const getName = (name: string) => {
    if (isDown320 && name.length >= 12) {
      return `${name.slice(0, 12)}...`;
    }
    if (isDown420 && name.length >= 16) {
      return `${name.slice(0, 16)}...`;
    }
    if (isDown470 && name.length >= 24) {
      return `${name.slice(0, 24)}...`;
    }
    if (isDown570 && name.length >= 16) {
      return `${name.slice(0, 16)}...`;
    }
    if (name.length >= 24) {
      return `${name.slice(0, 24)}...`;
    }
    return name;
  };

  const textSize = isDown470 ? 1.5 : 2;

  // TODO add your own result here
  // TODO create wolrd leaders page
  return (
    <vstack width="100%" padding={isDown470 ? "small" : "medium"}>
      {leaders.map((leader, i) => (
        <>
          <spacer size="small" />
          <hstack width="100%" padding="medium" backgroundColor={"white"}>
            <hstack>
              <Text
                size={textSize}
                color={
                  THEME.colors.dark
                }>{`${isDown420 ? "" : `${i + 1}. `}${getName(leader.name)}`}</Text>
            </hstack>
            <hstack alignment="end bottom" grow>
              <Text
                size={textSize}
                color={
                  THEME.colors.dark
                }>{`${leader.time > 99 ? "99+" : leader.time}`}</Text>
              <hstack width="3px" />
              <Text
                color={THEME.colors.dark}
                size={isDown470 ? 1 : 1.5}>{`s`}</Text>
            </hstack>
          </hstack>
        </>
      ))}
    </vstack>
  );
};
