import { handleActions } from "redux-actions";

import ARTICLES from '../data/articles';

import { setArticles } from "../actions";

const initialState = {
  articles: ARTICLES
};

export const articles = handleActions(
  {
    [setArticles](state, { payload }) {
      return { ...state, articles: payload };
    }
  },
  initialState
);
