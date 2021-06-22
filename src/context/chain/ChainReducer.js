import { isBigNumber } from 'bignumber.js';

function reducerCallback(state, key, value, update) {
  switch (state[key]) {
    case value:
      break;
    default:
      switch (true) {
        case isBigNumber(value):
          return {
            [key]: value,
            ...update,
          };
        default:
          throw new Error();
      }
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'updateAll':
      var update;
      for (let [key, value] of action.value.entries()) {
        if (state[key]) {
          switch (key) {
            case 'currentETHPrice':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;

            case 'currentNOMPrice':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            case 'NOMallowance':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              console.log('Update NOM Allowance: ', update);
              break;
            case 'strongBalance':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            case 'supplyNOM':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            case 'weakBalance':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            case 'blockNumber':
              try {
                update = reducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            default:
              throw new Error();
          }
        }
      }
      console.log('ChainReducer Update: ', update);
      if (update) {
        return {
          ...update,
        };
      }
      break;
    default:
      throw new Error();
  }
}
