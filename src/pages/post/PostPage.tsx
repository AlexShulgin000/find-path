import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {IPageProps, TBlocks} from "../../types.js";
import {FieldRow} from "../../components/game-field/FieldRow.js";
import {FieldBlock} from "../../components/game-field/FieldBlock.js";
import {THEME} from "../../theme.js";
import {Button} from "../../components/button/Button.js";
import {EPage, MAX_CELLS} from "../../const.js";
import {AllowedStep} from "../../components/game-field/AllowedStep.js";

const testBlocks: TBlocks = [
  [0, null, null, null],
  [1, 2, 3, null],
  [null, null, 4, null],
  [null, 6, 5, null],
  [8, 7, null, null],
  [9, 10, 11, null],
  [null, null, 12, 13],
];
const name = "AlexAlexAlexAlexAlexAlex";

export const PostPage = ({context, onChangeActivePage}: IPageProps) => {
  const blocksUp: TBlocks = [testBlocks[0], new Array(MAX_CELLS).fill(null)];
  const blocksBottom: TBlocks = [
    new Array(MAX_CELLS).fill(null),
    testBlocks[testBlocks.length - 1],
  ];
  const lastPointNumber = blocksBottom[1]?.reduce((acc, cell) => {
    return (cell ?? 0) > (acc ?? 0) ? cell : acc;
  }, null);
  const appWidth = context.dimensions?.width;
  const isDown420 = appWidth && appWidth <= 420;

  const getName = () => {
    if (isDown420 && name.length >= 16) {
      return `${name.slice(0, 16)}...`;
    }
    if (name.length >= 24) {
      return `${name.slice(0, 24)}...`;
    }
    return name;
  };

  const handelGuessPress = () => {
    onChangeActivePage(EPage.showHiddenPath);
  };

  return (
    <zstack width="100%" height="100%" alignment="top start">
      <image
        imageHeight={576}
        imageWidth={768}
        height="100%"
        width="100%"
        url="start.jpg"
        description="Dark background"
        resizeMode="cover"
      />
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        <vstack padding="medium" alignment="middle center">
          <Text>Try to guess</Text>
          <spacer size="small" />
          <Text color={THEME.colors.blood}>{getName()}</Text>
          <spacer size="small" />
          <Text>path!</Text>
        </vstack>

        {blocksUp.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const showPoint = blocksUp[rowIndex][cellIndex] === 0;
              return (
                <FieldBlock
                  rowIndex={rowIndex}
                  backgroundColor={
                    blocksUp[rowIndex][cellIndex] === null
                      ? THEME.colors.dark
                      : THEME.colors.orange
                  }>
                  {showPoint && <AllowedStep color={THEME.colors.dark} />}
                </FieldBlock>
              );
            })}
          </FieldRow>
        ))}

        <Text>???</Text>

        {blocksBottom.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              return (
                <FieldBlock
                  rowIndex={rowIndex}
                  backgroundColor={
                    blocksBottom[rowIndex][cellIndex] === null
                      ? THEME.colors.dark
                      : THEME.colors.orange
                  }>
                  {lastPointNumber === blocksBottom[rowIndex][cellIndex] && (
                    <AllowedStep color={THEME.colors.dark} />
                  )}
                </FieldBlock>
              );
            })}
          </FieldRow>
        ))}

        <vstack padding="medium">
          <Button onPress={handelGuessPress}>Guess</Button>
        </vstack>
      </vstack>
    </zstack>
  );
};
