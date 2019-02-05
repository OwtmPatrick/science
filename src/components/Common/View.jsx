import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  setClicked = () => {
    this.setState({
      clicked: !this.state.clicked
    });
    this.props.updateView(this.state.clicked);
  };

  render() {
    const { classes } = this.props;

    return this.state.clicked ? null : (
      <Button
        variant="outlined"
        color="primary"
        className={classes.view}
        onClick={this.setClicked}
      >
        View more
      </Button>
    );
  }
}

const styles = theme => ({
  view: {
    width: 120,
    height: 40,
    margin: 20
  }
});

export const View = withStyles(styles)(ViewComponent);

View.propTypes = {
  updateView: PropTypes.func.isRequired
};
