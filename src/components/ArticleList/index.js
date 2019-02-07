import { connect } from "react-redux";

import ArticleListComponent from "./ArticleList";

const mapStateToProps = state => ({
  articles: state.articles.articles
});

const mapDispatchToProps = {};

export const ArticleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListComponent);