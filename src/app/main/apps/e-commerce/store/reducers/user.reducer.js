import * as Actions from '../actions';

const initialState = {
  data: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_USER: {
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

export default userReducer;
