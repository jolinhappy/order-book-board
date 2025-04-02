import { describe, test, expect } from 'vitest';
import formateNumber from './formateNumber';

describe('formate number', () => {
  test('should return "0" if price is not a number', () => {
    const result = formateNumber({ price: 'abc' });
    expect(result).toBe('0');
  });

  test('should return "0" if price is Infinity', () => {
    const result = formateNumber({ price: String(Infinity) });
    expect(result).toBe('0');
  });

  test('should format valid number with default 4 decimal places', () => {
    const result = formateNumber({ price: '123.456' });
    expect(result).toBe('123.4560');
  });

  test('should format number with 2 decimal places if specified', () => {
    const result = formateNumber({ price: '123.456', decimalPlaces: 2 });
    expect(result).toBe('123.46');
  });

  test('should format number with commas as thousands separators', () => {
    const result = formateNumber({ price: '123456789012345.6789', decimalPlaces: 2 });
    expect(result).toBe('123,456,789,012,345.68'); // 千分位也會顯示
  });
});
