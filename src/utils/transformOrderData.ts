import bn from 'bignumber.js';

const transformOrderData = (orderData: [string, string][]) => {
  let sum = bn(0);
  return orderData.map((item: [string, string]) => {
    sum = sum.plus(bn(item[1]));
    return {
      price: bn(item[0]).toFixed(2),
      quantity: bn(item[1]).toFixed(2),
      totalQuantity: sum.toFixed(2),
    };
  });
};

export default transformOrderData;
