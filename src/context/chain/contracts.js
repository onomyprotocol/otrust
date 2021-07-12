import { Contract } from '@ethersproject/contracts';

const NomContractJSON = require('./ERC20NOM.json');
const BondingContractJSON = require('./BondingNOM.json');
const UniswapContractJSON = require('./UniSwap.json');

export const contAddrs = require('./NOMAddrs.json');
const uniswapUsdcAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
/**
 * NOM ERC20 Contract instance
 */
export function NOMCont(library) {
  const ABI = NomContractJSON.abi;
  return new Contract(contAddrs.NOMERC20, ABI, library?.getSigner());
}

/**
 * Haven Contract instance
 */
export function BondingCont(library) {
  const ABI = BondingContractJSON.abi;
  return new Contract(contAddrs.BondingNOM, ABI, library?.getSigner());
}

/**
 * UniSwap Contract instance
 */
export function UniSwapCont(library) {
  const ABI = UniswapContractJSON;
  return new Contract(uniswapUsdcAddress, ABI, library?.getSigner());
}
