import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
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

const initialUser = {
  data: {},
  isRegistered: false,
  isLoggedIn: false,
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

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return action.payload;
    case LOGIN_SUCCESS:
      return action.payload;
    case LOG_OUT:
      return action.payload;
    default:
      return state;
  }
};
