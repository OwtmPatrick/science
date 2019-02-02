import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { auth, articles, modalsController } from "../reducers";

const rootReducer = combineReducers({
  auth,
  articles,
  modalsController
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;