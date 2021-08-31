import * as Actions from '../actions';

const initialState = {
  data: [],
  searchText: ''
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CONTACTS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SET_CONTACTS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default: {
      return state;
    }
  }
};

export default contactsReducer;
