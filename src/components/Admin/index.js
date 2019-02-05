import { connect } from "react-redux";

import AdminComponent from "./Admin";
import { openModal, closeModal } from "../../actions";

const mapStateToProps = state => ({
  modalConfirmExit: state.modalsController.CONFIRM_EXIT
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

export const Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComponent);
