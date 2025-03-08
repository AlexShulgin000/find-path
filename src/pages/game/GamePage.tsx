import {Devvit, useState} from "@devvit/public-api";
import {IPageProps, TBlocks} from "../../types.js";
import {FieldRow} from "./components/FieldRow.js";
import {FieldBlock} from "./components/FieldBlock.js";
import {CELL_RADIUS} from "./game.const.js";
import {Hero} from "./components/Hero.js";

// x | | |
// x x x |
// | | x |
// | x x |
// x x | |
// x x x |
// | | x x
const testBlocks: TBlocks = [
  [0, null, null, null],
  [1, 2, 3, null],
  [null, null, 4, null],
  [null, 6, 5, null],
  [8, 7, null, null],
  [9, 10, 11, null],
  [null, null, 12, 13],
];

export const GamePage = ({onChangeActivePage}: IPageProps) => {
  const [heroPosition, setHeroPosition] = useState({rowIndex: 0, cellIndex: 0});

  const handleCellPress = (rowIndex: number, cellIndex: number) => {
    console.log(1, rowIndex, cellIndex);
  };

  return (
    <zstack width="100%" height="100%" alignment="top start">
      <image
        imageHeight={576}
        imageWidth={768}
        height="100%"
        width="100%"
        url="field.jpg"
        description="Dark game field"
        resizeMode="cover"
      />
      <vstack
        width="100%"
        height="100%"
        padding="medium"
        alignment="middle center">
        {testBlocks.map((row, rowIndex) => (
          <FieldRow>
            {row.map((_, cellIndex) => {
              const cornerCellRadius =
                CELL_RADIUS[rowIndex as keyof typeof CELL_RADIUS];
              const isHeroCell =
                heroPosition.rowIndex === rowIndex &&
                heroPosition.cellIndex === cellIndex;
              return (
                <FieldBlock
                  onPress={() => handleCellPress(rowIndex, cellIndex)}
                  cornerRadius={cornerCellRadius}
                  isHero={isHeroCell}>
                  {isHeroCell && <Hero />}
                </FieldBlock>
              );
            })}
          </FieldRow>
        ))}
      </vstack>
    </zstack>
  );
};
