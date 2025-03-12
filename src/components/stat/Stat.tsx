import {Devvit} from "@devvit/public-api";
import {Text} from "../text/Text.js";
import {StatItem} from "./StatItem.js";
import {ILeaderboardCurrentUser, ILeaderboardUser} from "../../types.js";

interface IStatProps {
  context: Devvit.Context;
  isTime?: boolean;
  leaders: ILeaderboardUser[];
  currentUser?: ILeaderboardCurrentUser | null;
}

export const Stat = ({context, isTime, leaders, currentUser}: IStatProps) => {
  const isCurrentUserInLeaders = leaders.some(
    leader => leader.member === currentUser?.name,
  );
  const shownLeaders = leaders.slice(0, isCurrentUserInLeaders ? 6 : 5);

  return (
    <vstack width="100%" padding={"small"}>
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
