import {Devvit} from "@devvit/public-api";
import {Text} from "../text/Text.js";
import {StatItem} from "./StatItem.js";
import {ILeaderboardCurrentUser, ILeaderboardUser} from "../../types.js";

interface IStatProps {
  context: Devvit.Context;
  isTime?: boolean;
  leaders: ILeaderboardUser[];
  currentUser?: ILeaderboardCurrentUser;
}

export const Stat = ({context, isTime, leaders, currentUser}: IStatProps) => {
  const shownLeaders = leaders.slice(0, 5);
  const isCurrentUserInLeaders = shownLeaders.some(
    leader => leader.member === currentUser?.name,
  );
  const appWidth = context.dimensions?.width;
  const isDown470 = appWidth && appWidth <= 470;

  return (
    <vstack width="100%" padding={isDown470 ? "small" : "medium"}>
      {shownLeaders.map((leader, i) => (
        <StatItem
          rank={i + 1}
          currentUser={currentUser}
          leader={leader}
          context={context}
          isTime={isTime}
        />
      ))}
      {!!(!isCurrentUserInLeaders && currentUser) && (
        <>
          <hstack width="100%" padding="medium">
            <Text>...</Text>
          </hstack>
          <StatItem
            currentUser={currentUser}
            leader={{member: currentUser.name, score: currentUser.score}}
            rank={currentUser.rank}
            context={context}
            isTime={isTime}
          />
          )
        </>
      )}
    </vstack>
  );
};
