import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { getTokenFromStorage } from "../../utils";

export const LoginRouter = ({ component: Component, ...rest }) => {
  const token = getTokenFromStorage();
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Redirect to={"/admin"} /> : <Component {...props} />
      }
    />
  );
};

LoginRouter.propTypes = {
  component: PropTypes.func.isRequired,
};