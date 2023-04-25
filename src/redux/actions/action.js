import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from "../types/index";
import axios from "axios";

const filterCategoriesEndpoint = "http://localhost:8001/filterCategories";
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
        axios.get(filterCategoriesEndpoint),
        axios.get(phonesEndpoint),
        axios.get(accessoryEndpoint),
        axios.get(smartWatchesEndpoint),
      ])
      .then(
        axios.spread(
          (
            filterCategoriesEndpoint,
            phonesEndpoint,
            accessoryEndpoint,
            smartWatchesEndpoint
          ) => {
            dispatch({
              type: FETCH_DATA_SUCCESS,
              payload: {
                categories: filterCategoriesEndpoint.data,
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
