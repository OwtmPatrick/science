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
      <Card className={classes.article}>
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

          <Typography className={classes.articleContent}>{content}</Typography>
        </CardContent>

        {this.state.videoOpen && video ? (
          <div onClick={this.setVideoOpen}>
            <Video videoSrc={video} />
          </div>
        ) : null}

        {admin ? (
          <Link to={`/articles/${id}`} style={{ textDecoration: "none" }}>
            <Button color="primary" variant="outlined">
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
  }
  // manageButtons: {
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   padding: 10
  // },
  // buttonDelete: {
  //   marginLeft: 15,
  //   color: theme.palette.error.main,
  //   borderColor: theme.palette.error.main
  // }
});

export const Article = withStyles(styles)(ArticleComponent);

Article.propTypes = {
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
