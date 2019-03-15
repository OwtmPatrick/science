import React, { Component } from "react";
import {
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { AUTH_ERROR } from "../../constants";

class LogIn extends Component {
  state = {
    login: "",
    password: "",
    loginError: false,
    passwordError: false
  };

  keyPress = event => {
    if (event.key === "Enter") {
      this.onLogin();
    }
  };

  onLogin = async () => {
    const { login, password } = this.state;

    this.setState({ loginError: false, passwordError: false });

    if (!login) {
      this.setState({ loginError: true });
    }
    if (!password) {
      this.setState({ passwordError: true });
    } else {
      await this.props.logIn(login, password);
      if (this.props.token) {
        this.props.history.push("/admin");
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <TextField
            label="Name"
            name="login"
            margin="normal"
            variant="outlined"
            value={this.state.login}
            error={this.state.loginError}
            onChange={e => this.setState({ login: e.currentTarget.value })}
            onKeyPress={this.keyPress}
            onFocus={() => this.setState({ loginError: false })}
          />

          <TextField
            type="password"
            label="Password"
            name="login"
            margin="normal"
            variant="outlined"
            value={this.state.password}
            error={this.state.passwordError}
            onChange={e => this.setState({ password: e.currentTarget.value })}
            onKeyPress={this.keyPress}
            onFocus={() => this.setState({ passwordError: false })}
          />

          <Button
            color="primary"
            variant="outlined"
            className={classes.button}
            onClick={this.onLogin}
          >
            Log in
          </Button>
        </Paper>

        <Dialog
          open={this.props.modalAuthError}
          onClose={() => this.props.closeModal(AUTH_ERROR)}
        >
          <DialogTitle>Invalid username or password</DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => this.props.closeModal(AUTH_ERROR)}
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30
  },
  button: {
    maxWidth: 150,
    marginTop: 15
  }
};

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  modalAuthError: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

const LoginComponent = withStyles(styles)(LogIn);

export default LoginComponent;
