export const checkIsMobile = (width?: number) => {
  return width ? width <= 515 : false;
};
