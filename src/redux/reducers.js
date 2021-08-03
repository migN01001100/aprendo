import * as actions from './actionsVariables';

export function Language(state =[], action) {
  switch (action.type) {
      case actions.ADD_WORD:
          return [
              ...state,
                action.payload
          ]
          break;
  
      default:
          return state
          break;
  }  
};