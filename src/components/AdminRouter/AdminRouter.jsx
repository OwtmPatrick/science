import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { getTokenFromStorage } from "../../utils";

export const AdminRouter = ({ component: Component, ...rest }) => {
  const token = getTokenFromStorage();

  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to={"/admin/login"} />
      }
    />
  );
};

AdminRouter.propTypes = {
  component: PropTypes.func.isRequired,
};