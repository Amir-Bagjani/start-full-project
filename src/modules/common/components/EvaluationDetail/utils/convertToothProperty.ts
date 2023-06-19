export const convertToothProperty = (obj: Record<string, string>) => {
  return Object.keys(obj).map((key) => ({
    label: key,
    value: obj[key],
  }));
};
