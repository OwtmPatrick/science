import { createAction } from "redux-actions";
import { openModal } from "./modalController";

import { setTokenToStorage, removeTokenFromStorage, generateToken } from "../utils";
import { AUTH_ERROR } from "../constants";

export const logInSuccess = createAction("LOGIN_SUCCESS");
export const logOutSuccess = createAction("LOGOUT_SUCCESS");

export const logIn = (login, password) => dispatch => {
  if (login === 'admin' && password === 'qweqwe123') {

    const token = generateToken(32);

    setTokenToStorage(token);
    dispatch(logInSuccess(token));
  } else {
    dispatch(openModal(AUTH_ERROR));
  }
}

export const logOut = () => dispatch => {
  removeTokenFromStorage();

  dispatch(logOutSuccess());
}
