import { BigNumber } from 'bignumber.js';

export function chopFloat(value, precision) {
  return Math.round(value * 10 ** precision) / 10 ** precision;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function truncate(str, maxDecimalDigits) {
  if (str.includes('.')) {
    const parts = str.split('.');
    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
  }
  return str;
}

export function format18(bignumber) {
  return bignumber.div(new BigNumber(10 ** 18));
}

export function parse18(bignumber) {
  return bignumber.times(new BigNumber(10 ** 18));
}

export var isNumber = function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
};
