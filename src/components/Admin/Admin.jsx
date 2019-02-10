import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import PropTypes from "prop-types";

import { LogOut } from "../Common";
import { ArticleList } from "../ArticleList/index";

import { CONFIRM_EXIT } from "../../constants";

const AdminComponent = ({
  history,
  openModal,
  closeModal,
  modalConfirmExit,
  logOut
}) => {
  return (
    <div>
      <LogOut logOut={() => openModal(CONFIRM_EXIT)} />

      <ArticleList admin />

      <Dialog open={modalConfirmExit} onClose={() => closeModal(CONFIRM_EXIT)}>
        <DialogTitle>Do you really want to leave?</DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={async () => {
              closeModal(CONFIRM_EXIT);
              await logOut();
              history.push("/admin/login");
            }}
          >
            Yes
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              closeModal(CONFIRM_EXIT);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AdminComponent.propTypes = {
  history: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalConfirmExit: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default AdminComponent;
