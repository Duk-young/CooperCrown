import * as Action from '../actions';

const initialState = {
  selectedFilters: null
};


const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_EMAIL_FILTERS: {
      return {
        ...state,
        selectedFilters: action.selectedFilters
      }
    }
    default: {
      return state;
    }
  }
};

export default emailReducer;