import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const LogOutComponent = ({ logOut, classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.typography}>Admin</Typography>

      <Button variant="outlined" color="primary" onClick={logOut}>
        Log out
      </Button>
    </Paper>
  );
};

const styles = theme => ({
  paper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    maxWidth: 450,
    margin: 10,
    padding: 10,
    "@media (min-width: 475px)": {
      margin: "10px auto"
    },
    "@media (min-width: 1300px)": {
      position: "absolute",
      right: 30,
      top: 20,
      flexDirection: "column",
      height: 110
    }
  },
  typography: {
    color: theme.palette.primary.dark,
    fontSize: 20
  }
});

export const LogOut = withStyles(styles)(LogOutComponent);
