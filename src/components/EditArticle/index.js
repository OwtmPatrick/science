import { connect } from "react-redux";

import EditArticleComponent from "./EditArticle";
import { editArticle } from "../../actions";

const mapStateToProps = state => ({
  articles: state.articles.articles
  //   modalConfirmExit: state.modalsControl.CONFIRM_EXIT
});

const mapDispatchToProps = {
  editArticle
};

export const EditArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticleComponent);
