import React, { Component } from "react";
import {
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";

import { AUTH_ERROR } from "../../constants";

class LoginComponent extends Component {
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
    return (
      <React.Fragment>
        <Paper style={styles.paper}>
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
            style={styles.button}
            onClick={this.onLogin}
          >
            Enter
          </Button>
        </Paper>

        <Dialog
          open={this.props.modal}
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
      </React.Fragment>
    );
  }
}

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 350,
    margin: 10,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 300,
    padding: 30
  },
  button: {
    maxWidth: 150,
    marginTop: 15
  }
};

export default LoginComponent;
