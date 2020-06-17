import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import content from "../../content";
import auth from "../../auth";

import middleware from "./middleware";

// const allReducers = combineReducers({
//   content: content.reducer,
//   auth: auth.reducer
// });

const allMiddleware =
  process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(
  combineReducers({ content: content.reducer, auth: auth.reducer }),
  allMiddleware
);

export default store;
