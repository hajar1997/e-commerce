import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from "../types/index";

const initialState = {
  searchedData: [],
  searchSubmitted: false,
  categories: [],
  phones: [],
  accessories: [],
  smartWatches: [],
  comments: [],
  error: null,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED_DATA:
      return {
        ...state,
        searchedData: action.payload,
      };
    case SET_SEARCH_SUBMITTED:
      return {
        ...state,
        searchSubmitted: action.payload,
      };
    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        categories: action.payload.categories,
        phones: action.payload.phones,
        accessories: action.payload.accessories,
        smartWatches: action.payload.smartWatches,
        comments: action.payload.comments,
        error: null,
      };
    }
    case FETCH_DATA_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
