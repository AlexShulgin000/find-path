import {IHeroPosition, TAllowedSteps, TBlocks} from "../../types.js";

/**
 * Response: {rowIndex: Set<cellIndex>}
 * */
export const getHeroAllowedSteps = (
  blocks: TBlocks,
  hPosition: IHeroPosition | null,
) => {
  if (!hPosition) return {};
  const steps: TAllowedSteps = {};
  const currentRowIndex = hPosition.rowIndex;
  const currentCellIndex = hPosition.cellIndex;
  const row = blocks[currentRowIndex];
  const currentStepNumber = blocks[currentRowIndex][currentCellIndex];

  for (let celIndex = 0; celIndex < row.length; celIndex++) {
    const cellNumber = blocks[currentRowIndex][celIndex];
    // right / left
    if (!cellNumber || (currentStepNumber && cellNumber > currentStepNumber)) {
      if (
        celIndex === currentCellIndex + 1 ||
        celIndex === currentCellIndex - 1
      ) {
        steps[currentRowIndex] = new Set([
          ...(steps[currentRowIndex] ?? []),
          celIndex,
        ]);
      }
    }
  }
  // bottom
  const nextRow = blocks[currentRowIndex + 1];
  if (nextRow) {
    steps[currentRowIndex + 1] = new Set([currentCellIndex]);
  }
  return steps;
};
