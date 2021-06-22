import { BigNumber } from 'bignumber.js';

import { chopFloat, randomInt, truncate, format18, parse18, isNumber } from './math';

describe('Given chopFloat util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = chopFloat(100.12345, 2);
      const result2 = chopFloat(100.123456, 5);
      const result3 = chopFloat(0.555, 2);
      const result4 = chopFloat(-2.538, 4);
      expect(result1).toEqual(100.12);
      expect(result2).toEqual(100.12346);
      expect(result3).toEqual(0.56);
      expect(result4).toEqual(-2.538);
    });
  });
});

describe('Given randomInt util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result = randomInt(10, 20);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(20);
      expect(result.toString()).toMatch(new RegExp(/^[0-9]{2}$/));
    });
  });
});

describe('Given truncate util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = truncate('100.2555', 2);
      const result2 = truncate('-10.265', 2);
      const result3 = truncate('100.2555', 6);
      const result4 = truncate('1002555', 6);
      expect(result1).toEqual('100.25');
      expect(result2).toEqual('-10.26');
      expect(result3).toEqual('100.2555');
      expect(result4).toEqual('1002555');
    });
  });
});

describe('Given format18 util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = format18(new BigNumber(10 ** 36));
      expect(JSON.stringify(result1)).toContain('999999999999999900');
    });
  });
});

describe('Given parse18 util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = parse18(new BigNumber(10));
      expect(JSON.stringify(result1)).toContain('10000000000000000000');
    });
  });
});

describe('Given isNumber util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = isNumber(10);
      const result2 = isNumber(10.56);
      const result3 = isNumber('10.25');
      expect(result1).toBeTruthy();
      expect(result2).toBeTruthy();
      expect(result3).toBeFalsy();
    });
  });
});
