import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  SET_PRODUCT_COUNT,
  INCREASE_PRODUCT_COUNT
} from "../types/index";
import axios from "axios";

const filterCategoriesEndpoint = "http://localhost:8001/filterCategories";
const phonesEndpoint = "http://localhost:8001/phones";
const accessoryEndpoint = "http://localhost:8001/accessories";
const smartWatchesEndpoint = "http://localhost:8001/smartWatches";
const questions_answersEndpoint = "http://localhost:8001/questions_answers";

export const setSearchedData = (searchedData) => ({
  type: SET_SEARCHED_DATA,
  payload: searchedData,
});

export const setSearchSubmitted = (searchSubmitted) => ({
  type: SET_SEARCH_SUBMITTED,
  payload: searchSubmitted,
});

// export const setProductCount = (productCount) => ({
//   type: SET_PRODUCT_COUNT,
//   payload: productCount,
// });

// export const increaseProductCount = (count) => ({
//   type: INCREASE_PRODUCT_COUNT,
//   payload: count,
// });

export const fetchData = () => {
  return (dispatch) => {
    axios
      .all([
        axios.get(filterCategoriesEndpoint),
        axios.get(phonesEndpoint),
        axios.get(accessoryEndpoint),
        axios.get(smartWatchesEndpoint),
        axios.get(questions_answersEndpoint),
      ])
      .then(
        axios.spread(
          (
            filterCategoriesEndpoint,
            phonesEndpoint,
            accessoryEndpoint,
            smartWatchesEndpoint,
            questions_answersEndpoint
          ) => {
            dispatch({
              type: FETCH_DATA_SUCCESS,
              payload: {
                categories: filterCategoriesEndpoint.data,
                phones: phonesEndpoint.data,
                accessories: accessoryEndpoint.data,
                smartWatches: smartWatchesEndpoint.data,
                questions_answers: questions_answersEndpoint,
              },
            });
          }
        )
      )
      .catch((error) => {
        dispatch({
          type: FETCH_DATA_FAILURE,
          payload: error.message,
        });
      });
  };
};
