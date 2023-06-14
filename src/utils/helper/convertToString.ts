export const convertValuesToString = <T extends {}>(input: T) => {
  return new URLSearchParams(JSON.stringify(input)).toString();
};
