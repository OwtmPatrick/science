import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const ManageButtonsComponent = ({ classes, id, history }) => {
  // console.log(history);
  return (
    <div className={classes.container}>
      <Link to={`/articles/${id}`}>
        <Button color="primary" variant="outlined">
          Edit
        </Button>
      </Link>

      <Button variant="outlined" className={classes.delete}>
        Delete
      </Button>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 10
  },
  // edit: {
  //   textDecoration: "none"
  // },
  delete: {
    marginLeft: 15,
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  }
});

export const ManageButtons = withStyles(styles)(ManageButtonsComponent);
