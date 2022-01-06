import * as Actions from '../actions';
const initialState = {
  data: null
};
const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DISCOUNT: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_DISCOUNT: {
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
export default discountReducer;
