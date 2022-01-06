import * as Actions from '../actions';

const initialState = {
  data: null
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SERVICE: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_SERVICE: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default serviceReducer;
