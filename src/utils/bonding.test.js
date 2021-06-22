import { priceAtSupply, supplyAtPrice, NOMsupplyETH, ETHtoNOM, NOMtoETH } from './bonding';

describe('Given priceAtSupply util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = priceAtSupply(100000000);
      const result2 = priceAtSupply(10000000000);
      const result3 = priceAtSupply(-1000000);
      const result4 = priceAtSupply(0);
      expect(result1).toEqual(1);
      expect(result2).toEqual(10000);
      expect(result3).toEqual(0.0001);
      expect(result4).toEqual(0);
    });
  });
});

describe('Given supplyAtPrice util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = supplyAtPrice(100);
      const result2 = supplyAtPrice(0);
      const result3 = supplyAtPrice(-5);
      expect(result1).toEqual(1000000000);
      expect(result2).toEqual(0);
      expect(result3).toEqual(NaN);
    });
  });
});

describe('Given NOMsupplyETH util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = NOMsupplyETH(100000000, 100000000);
      const result2 = NOMsupplyETH(0, 0);
      const result3 = NOMsupplyETH(10, 20);
      const result4 = NOMsupplyETH(100634504500, 5685, 100000865424500, 445);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(-2.333333333333333e-13);
      expect(result4).toEqual(33971872307903492);
    });
  });
});

describe('Given ETHtoNOM util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = ETHtoNOM(100000000, 100000000);
      const result2 = ETHtoNOM(0, 0);
      const result3 = ETHtoNOM(100.5, 2000);
      expect(result1).toEqual({ diff: 58440020.60450177, supplyBot: 100498756.2112089, supplyTop: 158938776.81571066 });
      expect(result2).toEqual({ diff: 0, supplyBot: 0, supplyTop: 0 });
      expect(result3).toEqual({
        diff: 1442639.3506066913,
        supplyBot: 2009.9751242241782,
        supplyTop: 1444649.3257309154,
      });
    });
  });
});

describe('Given NOMtoETH util function', () => {
  describe('when the function is called', () => {
    it('should return correct value', () => {
      const result1 = NOMtoETH(100000000, 100000000);
      const result2 = NOMtoETH(0, 0);
      const result3 = NOMtoETH(100.5, 2000);
      const result4 = NOMtoETH(10000005556668456848645, 250000685555565285525555);
      expect(result1).toEqual({ diff: 33000000, supplyBot: 0, supplyTop: 100000000 });
      expect(result2).toEqual({ diff: 0, supplyBot: 0, supplyTop: 0 });
      expect(result3).toEqual({ diff: 3.783164797912506e-8, supplyBot: 1899.5, supplyTop: 2000 });
      expect(result4).toEqual({
        diff: 5.943336424999646e52,
        supplyBot: 2.400006799988968e23,
        supplyTop: 2.5000068555556527e23,
      });
    });
  });
});
