import { handleActions } from "redux-actions";

import { openModal, closeModal, closeAllModals } from "../actions";
import {
  // auth
  AUTH_ERROR,
  CONFIRM_EXIT,
  // articles
  CONFIRM_DELETE_ARTICLE
} from "../constants";

const initialState = {
  // auth
  [AUTH_ERROR]: false,
  [CONFIRM_EXIT]: false,
  // articles
  [CONFIRM_DELETE_ARTICLE]: false,
  data: {}
};

export const modalsController = handleActions(
  {
    [openModal](state, { payload }) {
      if (payload.data) {
        const addData = {
          [payload.modal]: payload.data
        };

        return {
          ...state,
          [payload.modal]: true,
          data: { ...state.data, ...addData }
        };
      }
      return { ...state, [payload]: true };
    },
    [closeModal](state, { payload }) {
      if (payload.data) {
        const addData = {
          [payload.modal]: payload.data
        };

        return {
          ...state,
          [payload.modal]: false,
          data: { ...state.data, ...addData }
        };
      }
      return { ...state, [payload]: false };
    },
    [closeAllModals]() {
      return initialState;
    }
  },
  initialState
);
