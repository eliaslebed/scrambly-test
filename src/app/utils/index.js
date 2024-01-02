export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const screens = {
  sm: 351,
  md: 768,
  lg: 984,
  xl: 1240,
};
