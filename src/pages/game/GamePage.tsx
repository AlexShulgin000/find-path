import {Devvit, useState} from "@devvit/public-api";
import {IPageProps, TBlocks} from "../../types.js";
import {FieldRow} from "./components/FieldRow.js";

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
  // TODO alway safe positon of 1 row
  const [position, setBlocs] = useState({rowIndex: 0, cellIndex: 0});

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
        {testBlocks.map((row, i) => (
          <FieldRow row={row} index={i} onCellPress={handleCellPress} />
        ))}
      </vstack>
    </zstack>
  );
};
