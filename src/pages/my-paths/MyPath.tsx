import {IGameData} from "../../types.js";
import {Devvit} from "@devvit/public-api";
import {THEME} from "../../theme.js";
import {Text} from "../../components/text/Text.js";

interface IMyPathProps {
  gameData: IGameData;
  played: number;
  onPress: (postId: string) => void;
}

export const MyPath = ({gameData, played, onPress}: IMyPathProps) => {
  return (
    <vstack
      padding="xsmall"
      alignment="center"
      onPress={() => onPress(gameData.postId)}>
      <vstack>
        {gameData.path.map(row => (
          <hstack>
            {row.map(cell => (
              <hstack
                padding="small"
                cornerRadius="small"
                width="8px"
                height="8px"
                borderColor={THEME.colors.blood}
                border="thin"
                backgroundColor={
                  cell !== null ? THEME.colors.orange : THEME.colors.dark
                }
              />
            ))}
          </hstack>
        ))}
      </vstack>
      {!!played && (
        <vstack padding="small" gap="small">
          <hstack alignment="center">
            <Text size={1.2}>Played times</Text>
          </hstack>
          <hstack alignment="center">
            <Text size={1.2}>{`${played}`}</Text>
          </hstack>
        </vstack>
      )}
    </vstack>
  );
};
