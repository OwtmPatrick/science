import { connect } from "react-redux";

import ArticleListComponent from "./ArticleList";
import { openModal, closeModal } from "../../actions";

const mapStateToProps = state => ({
  articles: state.articles.articles,
  errorSetPage: state.modalsController.ERROR_SET_PAGE
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

export const ArticleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListComponent);
