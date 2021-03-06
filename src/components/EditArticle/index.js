import { connect } from "react-redux";

import EditArticleComponent from "./EditArticle";
import {
  addArticle,
  editArticle,
  deleteArticle,
  openModal,
  closeModal
} from "../../actions";

const mapStateToProps = state => ({
  articles: state.articles.articles,
  modalConfirmDeleteArticle: state.modalsController.CONFIRM_DELETE_ARTICLE
});

const mapDispatchToProps = {
  addArticle,
  editArticle,
  deleteArticle,
  openModal,
  closeModal
};

export const EditArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticleComponent);
