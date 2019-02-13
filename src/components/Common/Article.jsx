import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Video } from ".";

import images from "../../data/images";
import play from "../../data/img/play.png";

class ArticleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoOpen: false
    };
  }

  setVideoOpen = () => {
    this.setState({
      videoOpen: !this.state.videoOpen
    });
  };

  getImage = url => {
    let index = url[11];
    if (url.length > 16) {
      return url;
    }
    return images[Number(index)];
  };

  render() {
    const {
      classes,
      id,
      image,
      video,
      section,
      title,
      content,
      admin
    } = this.props;

    return (
      <Card className={admin ? classes.arcticleAdmin : classes.article}>
        <div onClick={this.setVideoOpen} className={classes.imageContainer}>
          <img
            className={video ? classes.articleVideo : classes.articleImage}
            src={this.getImage(image)}
            alt=""
          />
          {video ? <Avatar className={classes.play} src={play} /> : null}
        </div>

        <CardContent className={classes.articleInfo}>
          <Typography className={classes.articleName}>{section}</Typography>

          <Typography className={classes.articleTitle}>{title}</Typography>

          <Typography className={classes.articleContent}>
            {content.length > 123 
              ? `${content.substr(0, 123)} ...`
              : content
            }
          </Typography>
        </CardContent>

        {this.state.videoOpen && video ? (
          <div onClick={this.setVideoOpen}>
            <Video videoSrc={video} />
          </div>
        ) : null}

        {admin ? (
          <Link to={`/articles/${id}`} style={{ textDecoration: "none" }}>
            <Button
              color="primary"
              variant="outlined"
              className={classes.buttonEdit}
            >
              Edit
            </Button>
          </Link>
        ) : null}
      </Card>
    );
  }
}

const styles = theme => ({
  article: {
    display: "flex",
    margin: "20px 10px 0",
    flexBasis: "31%",
    flex: "1 1 calc(30% - 7.5px)",
    flexDirection: "column"
  },
  arcticleAdmin: {
    display: "flex",
    margin: "20px 10px 0",
    flexBasis: "31%",
    flex: "1 1 calc(30% - 7.5px)",
    flexDirection: "column",
    position: "relative",
    paddingBottom: 30
  },
  imageContainer: {
    position: "relative"
  },
  articleImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  articleVideo: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    cursor: "pointer"
  },
  play: {
    position: "absolute",
    top: "calc(50% - 20px)",
    left: "calc(50% - 20px)"
  },
  articleInfo: {
    textAlign: "left",
    padding: "10px 20px 35px"
  },
  articleName: {
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.primary.light,
    lineHeight: 2,
    textTransform: "uppercase"
  },
  articleTitle: {
    fontSize: 16,
    color: theme.palette.primary.dark,
    lineHeight: 1.3,
    paddingBottom: 10
  },
  articleContent: {
    fontSize: 14,
    color: "#44484e"
  },
  buttonEdit: {
    position: "absolute",
    left: 15,
    bottom: 15
  }
});

ArticleComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  admin: PropTypes.bool.isRequired
};

export const Article = withStyles(styles)(ArticleComponent);
