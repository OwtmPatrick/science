import { handleActions } from "redux-actions";

import ARTICLES from "../data/articles";
import { generateID } from "../utils";

import { setArticles } from "../actions";

const initialState = {
  articles: ARTICLES.map(article => ({
    ...article,
    id: generateID()
  }))
};

export const articles = handleActions(
  {
    [setArticles](state, { payload }) {
      return { ...state, articles: payload };
    }
  },
  initialState
);
