import {THEME} from "../../theme.js";
import {Text} from "../text/Text.js";
import {Devvit} from "@devvit/public-api";
import {ILeaderboardCurrentUser, ILeaderboardUser} from "../../types.js";

interface IStatItemProps {
  leader: ILeaderboardUser;
  context: Devvit.Context;
  rank?: number;
  isTime?: boolean;
  currentUser?: ILeaderboardCurrentUser;
}

export const StatItem = ({
  context,
  leader,
  rank,
  currentUser,
  isTime,
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
          currentUser?.name === leader.member ? THEME.colors.champagne : "white"
        }>
        <hstack>
          <Text
            size={textSize}
            color={
              THEME.colors.dark
            }>{`${isDown420 || !rank ? "" : `${rank}. `}${getName(leader.member)}`}</Text>
        </hstack>
        <hstack alignment="end bottom" grow>
          <Text
            size={textSize}
            color={
              THEME.colors.dark
            }>{`${leader.score > 99 ? "99+" : leader.score}`}</Text>
          <hstack width="3px" />
          {!!isTime && (
            <Text
              color={THEME.colors.dark}
              size={isDown470 ? 1 : 1.5}>{`s`}</Text>
          )}
        </hstack>
      </hstack>
    </>
  );
};
