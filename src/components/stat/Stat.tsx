import {Devvit} from "@devvit/public-api";
import {Text} from "../text/Text.js";
import {StatItem} from "./StatItem.js";

const leaders = [
  {id: 1, name: "Jar Hilo", time: 12},
  {id: 2, name: "Hert JiopqwwwHert Jiopqw1", time: 16.5},
  {id: 99, name: "Alex Shulgin", time: 22},
];

const currentUser = {
  id: 99,
  name: "Alex Shulgin",
};

const currentUserResult = {id: 99, name: "Alex Shulgin", time: 22};

interface IStatProps {
  context: Devvit.Context;
  isLeaderboard?: boolean;
}

export const Stat = ({context, isLeaderboard}: IStatProps) => {
  const shownLeaders = leaders.slice(0, 5);
  const isCurrentUserInLeaders = shownLeaders.some(
    leader => leader.id === currentUser.id,
  );
  const appWidth = context.dimensions?.width;
  const isDown470 = appWidth && appWidth <= 470;

  return (
    <vstack width="100%" padding={isDown470 ? "small" : "medium"}>
      {shownLeaders.map((leader, i) => (
        <StatItem
          count={i + 1}
          currentUser={currentUser}
          leader={leader}
          context={context}
        />
      ))}
      {!isCurrentUserInLeaders && currentUserResult && (
        <>
          <hstack width="100%" padding="medium">
            <Text>...</Text>
          </hstack>
          {/* TODO How to recalculate place for users. count is empty now */}
          <StatItem
            currentUser={currentUser}
            leader={currentUserResult}
            context={context}
          />
          )
        </>
      )}
    </vstack>
  );
};
