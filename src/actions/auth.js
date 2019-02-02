import { createAction } from "redux-actions";
import { fetchLogIn } from "../networkers";
import { openModal } from "./modalController";

import { setTokenToStorage } from "../utils";
import { AUTH_ERROR } from "../constants";

export const logInRequest = createAction("FETCH_LOGIN_REQUEST");
export const logInSuccess = createAction("FETCH_LOGIN_SUCCESS");
export const logInFailed = createAction("FETCH_LOGIN_FAILED");

export const logIn = (login, password) => async dispatch => {
  dispatch(logInRequest());
  try {
    const response = await fetchLogIn(login, password);

    setTokenToStorage(response.token);
    dispatch(logInSuccess(response.token));
  } catch (e) {
    if (e.status === 1) {
      dispatch(logInFailed(e.message));

      dispatch(openModal(AUTH_ERROR));
    }
  }
};
