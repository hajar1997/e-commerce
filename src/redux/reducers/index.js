import {
  SET_BRANDS,
  SET_CATEGORIES,
  SET_COLORS,
  SET_DATA,
  SET_MAX_PRICE,
  SET_MIN_PRICE,
  SET_SELECTED_CHECKBOXES,
} from "../types/index";

const initialState = {
  brands: [],
  categories: [],
  colors: [],
  data: [],
  maxPrice: "",
  minPrice: "",
  selectedCheckboxes: {
    productBrand: [],
    productColor: [],
  },
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload,
      };
    case SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload,
      };
    case SET_SELECTED_CHECKBOXES:
      return {
        ...state,
        selectedCheckboxes: action.payload,
      };
    default:
      return state;
  }
};
