export const convertValuesToString = <T extends {}>(input: T) => {
  const params = JSON.stringify(input);
  return new URLSearchParams(JSON.parse(params)).toString();
};
