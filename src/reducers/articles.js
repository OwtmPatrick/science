import { handleActions } from "redux-actions";

import ARTICLES from "../data/articles";
import { generateID } from "../utils";

import { addArticle, editArticle, deleteArticle } from "../actions";

const initialState = {
  articles: ARTICLES.map(article => ({
    ...article,
    id: generateID()
  }))
};

export const articles = handleActions(
  {
    [addArticle](state, { payload }) {
      //payload = article
      const articles = [].concat(payload, state.articles);

      return { ...state, articles };
    },
    [editArticle](state, { payload }) {
      //payload = article
      const articleIndex = state.articles.findIndex(el => el.id === payload.id);
      const articles = state.articles;

      articles.splice(articleIndex, 1, payload);

      return { ...state, articles };
    },
    [deleteArticle](state, { payload }) {
      console.log(payload);
      //payload = index
      const articles = state.articles
        .slice(0, payload)
        .concat(state.articles.slice(payload + 1, state.articles.length));

      return { ...state, articles };
    }
  },
  initialState
);
