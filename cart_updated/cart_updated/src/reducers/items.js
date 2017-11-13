import { combineReducers } from 'redux';
import { REQUEST_ITEMS, ADD_ITEMS, REMOVE_ITEMS } from '../actions/items';

//changes are made with pure functions/reducers
function fetchDetailsState(state = {}, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return action.data;
    default:
      return state;
  }
}

function addItemState(state = [], action) {
  switch (action.type) {
    case ADD_ITEMS:
      const findExisting =  action.data.length > 0 && state.addItemState && state.addItemState.filter(name => name);
      let foundExistingOne = false;
      if (findExisting && findExisting.length > 0) {
        for (let i = 0; i < findExisting.length; i++) {
          if (findExisting && findExisting[i].itemName === action.data.itemName) {
            foundExistingOne = true;
            break;
          }
        }
      }
      let updatedAddItem = state.addItemState ? foundExistingOne ? state.addItemState : state.addItemState.concat(action.data) : state.concat(action.data);
      if (action.data.length == 0 ) {
        updatedAddItem = []; 
      }
      return Object.assign({}, state, {
        addItemState: updatedAddItem,
      })  
    default:
      return state;
  }
}


function removeItemState(state = 0, action) {
  switch (action.type) {
    case REMOVE_ITEMS:
      return action.data;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  fetchDetailsState,
  addItemState,
  removeItemState,
});

export default rootReducer;
