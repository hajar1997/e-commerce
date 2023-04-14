import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from "../types/index";
import axios from "axios";

const brandsEndpoint = "http://localhost:8001/brands";
const filterCategoriesEndpoint = "http://localhost:8001/filterCategories";
const colorsEndpoint = "http://localhost:8001/colors";
const phonesEndpoint = "http://localhost:8001/smartphones";
const accessoryEndpoint = "http://localhost:8001/accessories";
const smartWatchesEndpoint = "http://localhost:8001/smartWatches";

export const setSearchedData = (searchedData) => ({
  type: SET_SEARCHED_DATA,
  payload: searchedData,
});

export const setSearchSubmitted = (searchSubmitted) => ({
  type: SET_SEARCH_SUBMITTED,
  payload: searchSubmitted,
});

export const fetchData = () => {
  return (dispatch) => {
    axios
      .all([
        axios.get(brandsEndpoint),
        axios.get(filterCategoriesEndpoint),
        axios.get(colorsEndpoint),
        axios.get(phonesEndpoint),
        axios.get(accessoryEndpoint),
        axios.get(smartWatchesEndpoint),
      ])
      .then(
        axios.spread(
          (
            brandsEndpoint,
            filterCategoriesEndpoint,
            colorsEndpoint,
            phonesEndpoint,
            accessoryEndpoint,
            smartWatchesEndpoint
          ) => {
            dispatch({
              type: FETCH_DATA_SUCCESS,
              payload: {
                brands: brandsEndpoint.data,
                categories: filterCategoriesEndpoint.data,
                colors: colorsEndpoint.data,
                phones: phonesEndpoint.data,
                accessories: accessoryEndpoint.data,
                smartWatches: smartWatchesEndpoint.data,
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
