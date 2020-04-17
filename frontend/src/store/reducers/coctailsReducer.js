import {
  FETCH_COCTAILS_SUCCESS,
  FETCH_COCTAIL_SUCCESS,
  CREATE_COCTAIL_FAILURE
} from "../actions/coctailsActions";

const initialState = {
  coctails: [],
  coctail: [],
  error: null
};

const coctailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COCTAILS_SUCCESS:
      return { ...state, coctails: action.coctails };
    case FETCH_COCTAIL_SUCCESS:
      return { ...state, coctail: action.coctail };
    case CREATE_COCTAIL_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default coctailsReducer;
