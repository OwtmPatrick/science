import { connect } from "react-redux";
import LogInComponent from "./LogIn";

import { logIn, closeModal } from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  modal: state.modalsController.AUTH_ERROR
});

const mapDispatchToProps = {
  logIn,
  closeModal
};

export const LogIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInComponent);
