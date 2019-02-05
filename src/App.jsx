import React from "react";
import { Route } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import { indigo, yellow, red } from "@material-ui/core/colors";

import {
  ArticleList,
  LogIn,
  Admin,
  AdminRouter,
  EditArticle
} from "./components";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[900]
    },
    secondary: { light: yellow[300], main: yellow[500], dark: yellow[700] },
    error: { light: red[300], main: red[500], dark: red[700] }
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />

    <Route path="/" exact component={ArticleList} />

    <Route path="/admin/login" component={LogIn} />

    <AdminRouter path="/admin" component={Admin} />

    <Route path="/articles/:id" component={EditArticle} />
  </MuiThemeProvider>
);

// const App = withRouter(AppComponent);
// const styles = theme => ({

// })

// const App = withStyles(styles)(AppComponent);

export default App;
