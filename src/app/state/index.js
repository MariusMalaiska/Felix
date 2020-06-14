import { createStore, combineReducers } from "redux";
import content from "../../content";

const allReducers = combineReducers({ content: content.reducer });

// const store = createStore(
//   contentReducer,
//   process.env.NODE_ENV === "development" &&
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
  allReducers,
  process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
