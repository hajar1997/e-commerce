import {
    SET_BRANDS,
    SET_CATEGORIES,
    SET_COLORS,
    SET_DATA,
    SET_MAX_PRICE,
    SET_MIN_PRICE,
    SET_SELECTED_CHECKBOXES,
  } from "../types/index";
  
  export const setBrands = (brands) => ({
    type: SET_BRANDS,
    payload: brands,
  });
  
  export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
  });
  
  export const setColors = (colors) => ({
    type: SET_COLORS,
    payload: colors,
  });
  
  export const setData = (data) => ({
    type: SET_DATA,
    payload: data,
  });
  
  export const setMaxPrice = (maxPrice) => ({
    type: SET_MAX_PRICE,
    payload: maxPrice,
  });
  
  export const setMinPrice = (minPrice) => ({
    type: SET_MIN_PRICE,
    payload: minPrice,
  });
  
  export const setSelectedCheckboxes = (selectedCheckboxes) => ({
    type: SET_SELECTED_CHECKBOXES,
    payload: selectedCheckboxes,
  });
  