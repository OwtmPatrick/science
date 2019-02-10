import React from "react";
import { Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

import {
  ArticleList,
  LogIn,
  Admin,
  AdminRouter,
  LoginRouter,
  EditArticle
} from "./components";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[900]
    },
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />

    <Route path="/" exact component={ArticleList} />

    <LoginRouter path="/admin/login" component={LogIn} />

    <AdminRouter path="/admin" component={Admin} />

    <Route path="/articles/:id/:param?" component={EditArticle} />
  </MuiThemeProvider>
);

export default App;
