export type CalcExpensePriceResponse = {
  professinal_technical_cost: number | string;
  actual_professinal_technical_cost: number | string;
  ansethesia_professinal_cost: number | string;
  franchise: number | string;
  approvedcostprice: number | string;
  is_calculatetable: boolean;
};

export type CalcExpensePriceParams = {
  k: number | string;
  expense: number;
  has_base_insurance: number;
  number_of_sessions: number;
};
