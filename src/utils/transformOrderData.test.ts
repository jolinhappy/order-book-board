import { describe, test, expect } from 'vitest';
import transformOrderData from './transformOrderData';

describe('transform order data', () => {
  test('should transform into an array of object with price, quantity, and calculated totalQuantity values', () => {
    const input: [string, string][] = [
      ['82000', '1000'],
      ['85010', '2000'],
    ];
    const result = transformOrderData(input);

    expect(result).toEqual([
      { price: '82000', quantity: '1000', totalQuantity: '1000' },
      { price: '85010', quantity: '2000', totalQuantity: '3000' },
    ]);
  });

  test('should return empty array if input is empty', () => {
    expect(transformOrderData([])).toEqual([]);
  });
});
