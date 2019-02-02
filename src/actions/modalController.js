import { createAction } from "redux-actions";

export const openModal = createAction("OPEN_MODAL");
export const closeModal = createAction("CLOSE_MODAL");
export const closeAllModals = createAction("CLOSE_ALL");
