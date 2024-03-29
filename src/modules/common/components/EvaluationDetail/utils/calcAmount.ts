import { AddPriceValuesType } from '../components/AddPriceForm';

export const calcAmount = (price: AddPriceValuesType) => {
  const {
    professinal_technical_cost,
    ansethesia_professinal_cost,
    ansethesia_percent,
    deduction,
    franchise,
  } = price;

  const pureProfessinal_technical_cost =
    typeof professinal_technical_cost === 'string'
      ? Number(professinal_technical_cost.split(',').join(''))
      : professinal_technical_cost;

  const pureDeduction =
    typeof deduction === 'string' ? Number(deduction.split(',').join('')) : deduction;

  let subtotal =
    pureProfessinal_technical_cost +
    ((ansethesia_professinal_cost as number) * ((ansethesia_percent as number) ?? 0)) / 100;

  // return Math.round(subtotal - ((subtotal * franchise) / 100))
  return Math.round(subtotal - (subtotal * (franchise as number)) / 100 - pureDeduction!);
};
