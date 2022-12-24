export const randomSaturatedColor = () => {
  let r = Math.random().toString(16).slice(2, 4);
  let value_012345 = Math.random().toString(6).slice(2, 3);
  let hex = {
    [0]: `${r}00FF`,
    [1]: `00${r}FF`,
    [2]: `00FF${r}`,
    [3]: `${r}FF00`,
    [4]: `FF${r}00`,
    [5]: `FF00${r}`,
  }[value_012345];
  return "#" + hex;
};