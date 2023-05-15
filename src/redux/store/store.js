import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import { loaderReducer, mainReducer, userReducer } from "../reducers/reducer";

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  loading: loaderReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
