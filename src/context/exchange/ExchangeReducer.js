import {
  boolReducerCallback,
  bnReducerCallback,
  objReducerCallback,
  stringReducerCallback,
} from 'context/reducerCallback';

export function exchStringReducer(state, action) {
  console.log('Exchange String Reducer State: ', state);
  console.log('Exchange String Reducer Action: ', action);
  var update = state;
  switch (action.type) {
    case 'bidDenom':
      try {
        update = stringReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'input':
      update = stringReducerCallback(state[action.type], action.type, action.value, update);
      break;
    case 'output':
      try {
        update = stringReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'status':
      try {
        update = stringReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'strong':
      try {
        update = stringReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'weak':
      try {
        update = stringReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'update':
      for (let [key, value] of action.value.entries()) {
        switch (key) {
          case 'bidDenom':
            try {
              update = stringReducerCallback(state[key], key, value, update);
            } catch (e) {
              console.log(e);
            }
            break;

          case 'input':
            try {
              update = stringReducerCallback(state[key], key, value.toString(), update);
            } catch (e) {
              console.log(e);
            }
            break;

          case 'output':
            try {
              update = stringReducerCallback(state[key], key, value, update);
            } catch (e) {
              console.log(e);
            }
            break;
          case 'status':
            try {
              update = stringReducerCallback(state[key], key, value, update);
            } catch (e) {
              console.log(e);
            }
            break;
          case 'strong':
            try {
              update = stringReducerCallback(state[key], key, value, update);
            } catch (e) {
              console.log(e);
            }
            break;
          case 'weak':
            try {
              update = stringReducerCallback(state[key], key, value, update);
            } catch (e) {
              console.log(e);
            }
            break;
          default:
            throw new Error();
        }
      }
      break;
    default:
      throw new Error();
  }
  if (update) {
    console.log('Exchange String Update: ', update);
    return {
      ...update,
    };
  }
}

export function exchObjReducer(state, action) {
  // console.log("Exchange Obj Reducer State: ", state)
  // console.log("Exchange Obj Reducer State Action: ", action)
  var update = state;

  switch (action.type) {
    case 'askAmount':
      try {
        update = bnReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'bidAmount':
      try {
        update = bnReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'pendingTx':
      try {
        update = objReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'slippage':
      try {
        update = bnReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'txPending':
      try {
        update = boolReducerCallback(state[action.type], action.type, action.value, update);
      } catch (e) {
        console.log(e);
      }
      break;
    case 'update':
      for (let [key, value] of action.value.entries()) {
        if (state[key]) {
          switch (key) {
            case 'askAmount':
              try {
                update = bnReducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;

            case 'bidAmount':
              try {
                update = bnReducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            case 'pendingTx':
              try {
                update = objReducerCallback(state[key], key, value, update);
                console.log('Pending Tx Update: ', update);
              } catch (e) {
                console.log(e);
              }
              break;
            case 'slippage':
              try {
                update = bnReducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
            default:
              throw new Error();
            case 'txPending':
              try {
                update = boolReducerCallback(state[key], key, value, update);
              } catch (e) {
                console.log(e);
              }
              break;
          }
        }
      }
      break;
    default:
      throw new Error();
  }

  if (update) {
    console.log('Exchange Obj Reducer Update: ', update);
    return {
      ...update,
    };
  }
}
