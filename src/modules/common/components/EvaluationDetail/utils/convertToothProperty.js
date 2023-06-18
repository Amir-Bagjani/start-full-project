export const convertToothProperty = (obj) => {
  return Object.keys(obj).map((key) => ({
    label: key,
    value: obj[key],
  }));
};
