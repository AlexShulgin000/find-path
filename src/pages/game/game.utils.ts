import {IHeroPosition, TBlocks} from "../../types.js";

/**
 * Response: {xIndex: Set<yIndex>}
 * */
export const getHeroAllowedSteps = (
  blocks: TBlocks,
  hPosition: IHeroPosition,
) => {
  const steps: Record<string, Set<number>> = {};
  const currentRowIndex = hPosition.rowIndex;
  const currentCellIndex = hPosition.cellIndex;
  const row = blocks[currentRowIndex];
  const currentStepNumber = blocks[currentRowIndex][currentCellIndex];

  for (let celIndex = 0; celIndex < row.length; celIndex++) {
    const cellNumber = blocks[currentRowIndex][celIndex];
    if (
      hPosition.rowIndex === currentRowIndex &&
      (!cellNumber || (currentStepNumber && cellNumber > currentStepNumber))
    ) {
      if (
        celIndex !== currentCellIndex &&
        (celIndex === currentCellIndex + 1 || celIndex === currentCellIndex - 1)
      ) {
        steps[currentRowIndex] = new Set([
          ...(steps[currentRowIndex] ?? []),
          celIndex,
        ]);
      }
    }
  }
  const nextRow = blocks[currentRowIndex + 1];
  if (nextRow) {
    steps[currentRowIndex + 1] = new Set([currentCellIndex]);
  }
  return steps;
};
