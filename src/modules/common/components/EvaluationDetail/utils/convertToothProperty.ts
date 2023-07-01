import { ToothNumberResponse } from 'services/models';

export const convertToothProperty = (obj: Record<string, string>) => {
  return Object.keys(obj).map((key) => ({
    label: key,
    value: obj[key],
  }));
};

export const chunkToothPositions = (toothPositions: ToothNumberResponse) => {
  const chunks = [[], [], [], []] as { label: string; value: string }[][];

  for (const [label, value] of Object.entries(toothPositions)) {
    if (label.includes('بالا راست')) {
      chunks[1].push({ label, value });
    } else if (label.includes('بالا چپ')) {
      chunks[0].push({ label, value });
    } else if (label.includes('پائین راست')) {
      chunks[3].push({ label, value });
    } else if (label.includes('پائین چپ')) {
      chunks[2].push({ label, value });
    }
  }

  return chunks;

  // const chunkLookup = {
  //   "بالا راست": 0,
  //   "بالا چپ": 1,
  //   "پائین راست": 2,
  //   "پائین چپ": 3
  // };

  // const chunks = Object.entries(toothPositions).reduce((result, [label, value]) => {

  //   const chunkIndex = chunkLookup[label.split(" ")[1]];

  //   result[chunkIndex].push({ label, value });

  //   return result;
  // }, [[], [], [], []]);

  // return chunks;
};
