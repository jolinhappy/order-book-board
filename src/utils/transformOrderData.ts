import bn from 'bignumber.js';

const transformOrderData = (orderData: [string, string][]) => {
  let sum = bn(0);
  return orderData.map((item: [string, string]) => {
    sum = sum.plus(bn(item[1]));
    return {
      price: bn(item[0]).toString(),
      quantity: bn(item[1]).toString(),
      totalQuantity: sum.toString(),
    };
  });
};

export default transformOrderData;
