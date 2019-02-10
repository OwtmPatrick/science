import { handleActions } from "redux-actions";

import { getTokenFromStorage } from "../utils";
import { logInSuccess, logOutSuccess } from "../actions";

const token = getTokenFromStorage();

const initialState = {
  token: token ? token : ""
};

export const auth = handleActions(
  {
    [logInSuccess](state, { payload }) {
      return { ...state, token: payload };
    },
    [logOutSuccess](state) {
      return { ...state, token: '' };
    }
  },
  initialState
);
