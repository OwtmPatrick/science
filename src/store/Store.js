import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { articles } from "../reducers";

const rootReducer = combineReducers({
//   auth,
//   modalsController,
  articles
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;