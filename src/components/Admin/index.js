import { connect } from "react-redux";

import AdminComponent from "./Admin";
import { openModal, closeModal, logOut } from "../../actions";

const mapStateToProps = state => ({
  modalConfirmExit: state.modalsController.CONFIRM_EXIT
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  logOut
};

export const Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComponent);
