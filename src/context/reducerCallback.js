import { isBigNumber } from 'bignumber.js';

export function bnReducerCallback(state, key, value, update) {
  switch (state) {
    case value:
      return update;
    default:
      switch (true) {
        case isBigNumber(value):
          return {
            ...update,
            [key]: value,
          };
        default:
          throw new Error();
      }
  }
}

export function boolReducerCallback(state, key, value, update) {
  switch (state) {
    case value:
      return update;
    default:
      console.log('Update Bool');
      update = {
        ...update,
        [key]: value,
      };
      return update;
  }
}

export function objReducerCallback(state, key, value, update) {
  switch (state) {
    case value:
      return update;
    default:
      update = {
        ...update,
        [key]: value,
      };
      return update;
  }
}

export function stringReducerCallback(state, key, value, update) {
  switch (state) {
    case value:
      return update;
    default:
      update = {
        ...update,
        [key]: value,
      };
      return update;
  }
}
