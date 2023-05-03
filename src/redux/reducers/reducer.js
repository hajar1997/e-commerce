import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  // SET_PRODUCT_COUNT,
  // INCREASE_PRODUCT_COUNT,
} from "../types/index";

const initialState = {
  searchedData: [],
  searchSubmitted: false,
  categories: [],
  phones: [],
  accessories: [],
  smartWatches: [],
  questions_answers: [],
  // count: 0,
  // productCount: 0,
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
        questions_answers: action.payload.questions_answers,
        error: null,
      };
    }
    case FETCH_DATA_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    // case SET_PRODUCT_COUNT: {
    //   return {
    //     ...state,
    //     count: action.payload,
    //   };
    // }
    // case INCREASE_PRODUCT_COUNT: {
    //   return {
    //     ...state,
    //     count: state.count,
    //   };
    // }
    default:
      return state;
  }
};
