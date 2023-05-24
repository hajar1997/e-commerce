import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  SET_PRODUCT_COUNT,
  INCREASE_PRODUCT_COUNT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOADING_ON,
  LOADING_OFF,
  SET_FAVORITES,
  FETCH_FAVORITES,
} from "../types/index";
import axios from "axios";
import { notification } from "antd";

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

export const RegisterUser =
  (name, surname, email, prefix, phone, password) => async (dispatch) => {
    dispatch({ type: LOADING_ON });
    const existingUser = await axios.get(
      `http://localhost:8001/users?email=${email}`
    );
    if (existingUser.data.length > 0) {
      notification.open({
        type: "error",
        message: "This email is already registered",
      });
      dispatch({ type: LOADING_OFF });
      return;
    }
    const randomId = Math.floor(Math.random() * 1000000);
    await axios
      .post("http://localhost:8001/users", {
        id: randomId,
        name,
        surname,
        email,
        phone,
        prefix,
        password,
        addresses: [],
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          isRegistered: true,
          payload: res.data,
        });
        notification.open({
          type: "success",
          message: "You have successfully registered!",
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch({ type: LOADING_OFF });
      });
  };

export const LoginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios
    .get("http://localhost:8001/users", {
      email,
      password,
    })
    .then((res) => {
      const data = res.data;
      const filtered = data.filter(
        (f) => f.email === email && f.password === password
      );
      localStorage.setItem("current_id", filtered[0]?.id);
      dispatch(getUser(filtered[0]?.id));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch({ type: LOADING_OFF });
    });
};

export const getUser = (id) => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios
    .get(`http://localhost:8001/users/${id}`)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isLoggedIn: true,
          payload: res.data,
        },
      });
      localStorage.setItem("isLoggedIn", true);
    })
    .catch((err) => {
      notification.open({
        type: "error",
        message: "Email or password is incorrect",
      });
      dispatch(LogOut());
      localStorage.setItem("isLoggedIn", false);
    })
    .finally(() => {
      dispatch({ type: LOADING_OFF });
    });
};

export const LogOut = () => {
  localStorage.setItem("isLoggedIn", false);
  localStorage.removeItem("current_id");
  return {
    type: LOG_OUT,
    payload: {
      isLoggedIn: false,
      isRegistered: false,
      data: {},
    },
  };
};

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

export const fetchFavorites = () => (dispatch) => {
  axios
    .get("http://localhost:8001/favorites")
    .then((res) => {
      dispatch(setFavorites(res.data));
    })
    .catch((err) => console.log(err));
};

export const addProductToFavorites = (id) => async (dispatch) => {
  await axios
    .post("http://localhost:8001/favorites", { id })
    .then((res) => {
      dispatch(fetchFavorites());
      console.log("product is sent to favorites");
    })
    .catch((err) => console.log(err));
};

export const removeProductFromFavorites = (id) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8001/favorites/${id}`)
    .then((res) => {
      dispatch(fetchFavorites());
    })
    .catch((err) => console.log(err));
};
