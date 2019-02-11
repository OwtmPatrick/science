import { handleActions } from "redux-actions";

import ARTICLES from "../data/articles";
import { generateID } from "../utils";
import { articlesContent } from "../constants";

import { addArticle, editArticle, deleteArticle } from "../actions";

const initialState = {
  articles: ARTICLES.map((article, index) => {
    let content;

    if (index % 2 === 0) content = articlesContent[0];
    else if (index % 3 === 0) content = articlesContent[1];
    else if (index % 5 === 0) content = articlesContent[2];
    else content = article.content;

    return {
      ...article,
      id: generateID(),
      content
    };
  })
};

export const articles = handleActions(
  {
    [addArticle](state, { payload }) {
      const articles = [].concat(payload, state.articles);

      return { ...state, articles };
    },
    [editArticle](state, { payload }) {
      const articleIndex = state.articles.findIndex(el => el.id === payload.id);
      const articles = state.articles;

      articles.splice(articleIndex, 1, payload);

      return { ...state, articles };
    },
    [deleteArticle](state, { payload }) {
      const articles = state.articles
        .slice(0, payload)
        .concat(state.articles.slice(payload + 1, state.articles.length));

      return { ...state, articles };
    }
  },
  initialState
);
