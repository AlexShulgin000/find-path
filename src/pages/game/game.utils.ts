import {IHeroPosition, TAllowedSteps, TBlock, TBlocks} from "../../types.js";

/**
 * Response: {rowIndex: Set<cellIndex>}
 * */
export const getHeroAllowedSteps = (
  blocks: TBlocks,
  hPosition: IHeroPosition | null,
  passedPath: Record<string, TBlock>,
) => {
  if (!hPosition) return {};
  const steps: TAllowedSteps = {};
  const hRowIndex = hPosition.rowIndex;
  const hCellIndex = hPosition.cellIndex;
  const row = blocks[hRowIndex];

  for (let celIndex = 0; celIndex < row.length; celIndex++) {
    // right / left
    if (
      passedPath[`${hRowIndex}.${celIndex}`] === undefined &&
      (celIndex === hCellIndex + 1 || celIndex === hCellIndex - 1)
    ) {
      steps[hRowIndex] = new Set([...(steps[hRowIndex] ?? []), celIndex]);
    }
  }
  // bottom
  const nextRow = blocks[hRowIndex + 1];
  if (nextRow) {
    steps[hRowIndex + 1] = new Set([hCellIndex]);
  }
  return steps;
};
