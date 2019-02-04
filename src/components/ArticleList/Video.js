import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const VideoComponent = ({ videoSrc, classes }) => {
  const screenWidth = window.innerWidth;
  return (
    <Paper>
      <div className={classes.popup} />

      <div className={classes.window}>
        <iframe
          width={screenWidth > 1000 ? "854" : 0.9 * screenWidth + "px"}
          height={
            screenWidth > 1000 ? "480" : (0.9 / 1.77) * screenWidth + "px"
          }
          src={videoSrc}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    </Paper>
  );
};

const styles = theme => ({
  popup: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 1,
    background: "rgba(0, 0, 0, 0.3)",
    left: 0,
    top: 0
  },
  window: {
    position: "fixed",
    zIndex: 2,
    margin: "0 auto",
    right: 0,
    left: 0,
    top: "10%",
    textAlign: "center"
  }
});

const Video = withStyles(styles)(VideoComponent);

Video.propTypes = {
  videoSrc: PropTypes.string.isRequired
};

export default Video;
