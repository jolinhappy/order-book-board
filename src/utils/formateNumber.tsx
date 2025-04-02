import bn from 'bignumber.js';

const formateNumber = ({ price, decimalPlaces = 4 }: { price: string; decimalPlaces?: number }) => {
  const number = new bn(price);
  if (!number.isFinite()) return '0';
  return number.toFormat(decimalPlaces);
};

export default formateNumber;
