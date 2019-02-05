import { connect } from "react-redux";

import EditArticleComponent from "./EditArticle";
// import { openModal, closeModal } from "../../actions";

const mapStateToProps = state => ({
  articles: state.articles.articles
  //   modalConfirmExit: state.modalsControl.CONFIRM_EXIT
});

const mapDispatchToProps = {
  //   openModal,
  //   closeModal
};

export const EditArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticleComponent);
