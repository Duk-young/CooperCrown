import * as Actions from '../actions';
const initialState = {
  data: null
};
const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DOCTOR: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_DOCTOR: {
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
export default doctorReducer;
