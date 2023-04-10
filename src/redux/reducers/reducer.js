// import {
//   SET_SELECTED_CHECKBOXES,
//   SET_LEFT_SIDE_MOBILE_IS_OPEN,
//   SET_RIGHT_SIDE_MOBILE_IS_OPEN,
//   SET_TOGGLE,
//   SET_IS_MOBILE,
//   SET_BRANDS,
//   SET_CATEGORIES,
//   SET_COLORS,
//   SET_MAX_PRICE,
//   SET_MIN_PRICE,
//   SET_DATA,
// } from "../types/index";

// const initialState = {
//   brands: [],
//   categories: [],
//   colors: [],
//   maxPrice: "",
//   minPrice: "",
//   data: [],
//   selectedCheckboxes: {
//     productBrand: [],
//     productColor: [],
//   },
//   toggle: true,
//   isMobile: window.innerWidth < 992,
//   leftSideMobileIsOpen: false,
//   rightSideMobileIsOpen: false,
// };

// export const mainReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_BRANDS:
//       return {
//         ...state,
//         brands: action.payload,
//       };
//     case SET_CATEGORIES:
//       return {
//         ...state,
//         categories: action.payload,
//       };
//     case SET_COLORS:
//       return {
//         ...state,
//         colors: action.payload,
//       };
//     case SET_MAX_PRICE:
//       return {
//         ...state,
//         maxPrice: action.payload,
//       };
//     case SET_MIN_PRICE:
//       return {
//         ...state,
//         minPrice: action.payload,
//       };
//     case SET_DATA:
//       return {
//         ...state,
//         data: action.payload,
//       };
//     case SET_SELECTED_CHECKBOXES:
//       return {
//         ...state,
//         selectedCheckboxes: action.payload,
//       };
//     case SET_LEFT_SIDE_MOBILE_IS_OPEN:
//       return {
//         ...state,
//         leftSideMobileIsOpen: action.payload,
//       };
//     case SET_RIGHT_SIDE_MOBILE_IS_OPEN:
//       return {
//         ...state,
//         rightSideMobileIsOpen: action.payload,
//       };
//     case SET_TOGGLE:
//       return {
//         ...state,
//         toggle: action.payload,
//       };
//     case SET_IS_MOBILE:
//       return {
//         ...state,
//         isMobile: action.payload,
//       };
//     default:
//       return state;
//   }
// };
