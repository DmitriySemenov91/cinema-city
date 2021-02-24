import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { RootStateType } from "./reducers";

const  localStorageData = localStorage.getItem("MovieSearcherReduxStore");
const persistedState: RootStateType = localStorageData !== null ?
  JSON.parse(localStorageData) :
  {};


const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
  localStorage.setItem(
    "MovieSearcherReduxStore",
    JSON.stringify(store.getState())
  );
});

export default store;
