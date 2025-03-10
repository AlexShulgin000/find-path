import {THEME} from "../../theme.js";
import {Text} from "../text/Text.js";
import {Devvit} from "@devvit/public-api";

// TODO CHECK
export interface ILeader {
  id: number;
  name: string;
  time: number;
}

interface IStatItemProps {
  leader: ILeader;
  context: Devvit.Context;
  count?: number;
  // TODO change IUser
  currentUser: {id: number};
}

export const StatItem = ({
  context,
  leader,
  count,
  currentUser,
}: IStatItemProps) => {
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

  return (
    <>
      <spacer size="xsmall" />
      <hstack
        width="100%"
        padding="medium"
        backgroundColor={
          currentUser.id === leader.id ? THEME.colors.champagne : "white"
        }>
        <hstack>
          <Text
            size={textSize}
            color={
              THEME.colors.dark
            }>{`${isDown420 || !count ? "" : `${count}. `}${getName(leader.name)}`}</Text>
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
  );
};
