export class NumberFormat {
  static numberToText = (number: number) => {
    return number;
    // return number ? number.num2persian() : '';
  };

  static separateNum = (number: number, indicator: string = ',') => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, indicator);
  };
}
