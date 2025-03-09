import {TAllowedSteps, TBlocks} from "../../types.js";

export const getCreateGameAllowedSteps = (
  path: TBlocks,
  step: null | number,
) => {
  const steps: TAllowedSteps = {};

  // first
  if (step === null) {
    steps[0] = new Set([0, 1, 2, 3]);
    return steps;
  }

  // other
  for (let rowIndex = 0; rowIndex < path.length; rowIndex++) {
    const row = path[rowIndex];
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const cell = row[cellIndex];
      if (cell === step) {
        // left
        if (row[cellIndex - 1] === null) {
          steps[rowIndex] = new Set([
            ...(steps[rowIndex] ?? []),
            cellIndex - 1,
          ]);
        }
        // right
        if (row[cellIndex + 1] === null) {
          steps[rowIndex] = new Set([
            ...(steps[rowIndex] ?? []),
            cellIndex + 1,
          ]);
        }
        // bottom
        if (path[rowIndex + 1]) {
          steps[rowIndex + 1] = new Set([cellIndex]);
        }
        return steps;
      }
    }
  }

  return steps;
};
