import {
  SET_SEARCHED_DATA,
  SET_SEARCH_SUBMITTED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_SUCCESS,
  LOADING_ON,
  LOADING_OFF,
  SET_FAVORITES,
  SET_BASKET,
  MENU_CLICKED,
} from "../types/index";
import axios from "axios";
import { notification } from "antd";

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
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/filterCategories.json`),
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/phones.json`),
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/accessories.json`),
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/smartWatches.json`),
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/questions_answers.json`),
      ])
      .then(
        axios.spread((filterCategories, phones, accessories, smartWatches, questions_answers) => {
          dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: {
              categories: filterCategories.data,
              phones: phones.data,
              accessories: accessories.data,
              smartWatches: smartWatches.data,
              questions_answers: questions_answers.data,
            },
          });
        })
      )
      .catch((error) => {
        dispatch({
          type: FETCH_DATA_FAILURE,
          payload: error.message,
        });
      });
  };
};

export const RegisterUser = (name, surname, email, prefix, phone, password) => async (dispatch) => {
  dispatch({ type: LOADING_ON });

  const usersResponse = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/users.json`);
  const users = usersResponse.data || {};

  const existingUser = Object.values(users).find((user) => user.email === email);

  if (existingUser) {
    notification.open({
      type: "error",
      message: "This email is already registered",
    });
    dispatch({ type: LOADING_OFF });
    return;
  }

  const randomId = Math.floor(Math.random() * 1000000);
  const newUser = {
    id: randomId,
    name,
    surname,
    email,
    phone,
    prefix,
    password,
    addresses: {},
  };

  await axios
    .put(`${process.env.REACT_APP_DATABASE_URL}/users/${randomId}.json`, newUser)
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
    .get(`${process.env.REACT_APP_DATABASE_URL}/users.json`)
    .then((res) => {
      const users = res.data || {};
      const userKey = Object.keys(users).find((key) => users[key].email === email && users[key].password === password);
      const user = users[userKey];
      if (user) {
        localStorage.setItem("current_id", user.id);
        dispatch(getUser(user.id));
      } else {
        notification.open({
          type: "error",
          message: "Email or password is incorrect!",
        });
        throw new Error("Email or password is incorrect");
      }
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
    .get(`${process.env.REACT_APP_DATABASE_URL}/users/${id}.json`)
    .then((res) => {
      if (res.data) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            isLoggedIn: true,
            payload: res.data,
          },
        });
        localStorage.setItem("isLoggedIn", true);
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      notification.open({
        type: "error",
        message: err.message,
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
    .get(`${process.env.REACT_APP_DATABASE_URL}/favorites.json`)
    .then((res) => {
      const favorites = Object.values(res.data || {});
      dispatch(setFavorites(favorites));
    })
    .catch((err) => console.log(err));
};

export const addProductToFavorites = (id) => async (dispatch) => {
  await axios
    .put(`${process.env.REACT_APP_DATABASE_URL}/favorites/${id}.json`, { id })
    .then((res) => {
      dispatch(fetchFavorites());
      console.log("product is sent to favorites");
    })
    .catch((err) => console.log(err));
};

export const removeProductFromFavorites = (id) => async (dispatch) => {
  await axios
    .delete(`${process.env.REACT_APP_DATABASE_URL}/favorites/${id}.json`)
    .then((res) => {
      dispatch(fetchFavorites());
    })
    .catch((err) => console.log(err));
};

export const setBasket = (basket) => ({
  type: SET_BASKET,
  payload: basket,
});

export const fetchBasket = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_DATABASE_URL}/basket.json`)
    .then((res) => {
      const basket = Object.values(res.data || {});
      dispatch(setBasket(basket));
    })
    .catch((err) => console.log(err));
};

export const addProductToBasket =
  (id, quantity = 1) =>
  async (dispatch) => {
    await axios
      .put(`${process.env.REACT_APP_DATABASE_URL}/basket/${id}.json`, { id, quantity })
      .then((res) => {
        dispatch(fetchBasket());
        notification.open({
          type: "success",
          message: "You have successfully added product to the basket!",
        });
        console.log("Product is added to the basket");
      })
      .catch((err) => console.log(err));
  };

export const updateBasketProduct = (id, quantity) => async (dispatch) => {
  await axios
    .put(`${process.env.REACT_APP_DATABASE_URL}/basket/${id}.json`, { id, quantity })
    .then((res) => {
      dispatch(fetchBasket());
      console.log("Product quantity is updated in the basket");
    })
    .catch((err) => console.log(err));
};

export const removeProductFromBasket = (id) => async (dispatch) => {
  await axios
    .delete(`${process.env.REACT_APP_DATABASE_URL}/basket/${id}.json`)
    .then((res) => {
      dispatch(fetchBasket());
    })
    .catch((err) => console.log(err));
};

export const menuClicked = (isMenuClicked) => ({
  type: MENU_CLICKED,
  payload: isMenuClicked,
});
