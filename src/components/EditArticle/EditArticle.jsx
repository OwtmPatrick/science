import React, { Component } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

import {
  FILTER1,
  FILTER2,
  FILTER3,
  CONFIRM_DELETE_ARTICLE
} from "../../constants";

import { generateID } from "../../utils";

import images from "../../data/images";

class EditArticle extends Component {
  constructor() {
    super();
    this.state = {
      section: "",
      speciality: "",
      audience: "",
      title: "",
      content: "",
      video: "",
      image: "",
      sectionError: false,
      specialityError: false,
      audienceError: false,
      titleError: false,
      contentError: false
    };
  }

  componentWillMount() {
    const article = this.getArticle();

    if (article) {
      const { section, speciality, audience, title, content, image } = article;

      this.setState({
        section,
        speciality,
        audience,
        title,
        content,
      });

      if(image.length > 16) {
        this.setState({ image })
      } else this.setState({ image: images[Number(image[11])] })
    }
  }

  getArticle = () => {
    const { location, articles } = this.props;
    const index = location.pathname.indexOf("_");
    const id = location.pathname.substring(index);
    const article = articles.find(article => article.id === id);

    if (article) return article;
    return false;
  };

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addArticle = () => {
    const { section, speciality, audience, title, content, image } = this.state;

    const id = generateID();

    const newArticle = {
      id,
      section,
      speciality,
      audience,
      title,
      content,
      image
    };

    if (!section) {
      this.setState({ sectionError: true });
    }

    if (!speciality) {
      this.setState({ specialityError: true });
    }

    if (!audience) {
      this.setState({ audienceError: true });
    }
    if (!title) {
      this.setState({ titleError: true });
    }
    if (!content) {
      this.setState({ contentError: true });
    } else {
      this.props.addArticle(newArticle);
      this.props.history.push("/admin");
    }
  };

  saveArticle = () => {
    const { section, speciality, audience, title, content, image } = this.state;
    const article = this.getArticle();

    const newArticle = {
      id: article.id,
      section,
      speciality,
      audience,
      title,
      content,
      image
    };

    this.props.editArticle(newArticle);
    this.props.history.push("/admin");
  };

  deleteArticle = () => {
    const article = this.getArticle();

    const articleIndex = this.props.articles.findIndex(
      el => el.id === article.id
    );

    this.props.deleteArticle(articleIndex);
    this.props.closeModal(CONFIRM_DELETE_ARTICLE);
    this.props.history.push("/admin");
  };

  render() {
    const {
      classes,
      modalConfirmDeleteArticle,
      openModal,
      closeModal
    } = this.props;

    const isNew = this.props.match.params.param === "new";

    return (
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="h4" color="primary" className={classes.title}>
            {isNew ? 'Add article' : 'Edit article'}
          </Typography>

          <FormControl variant="outlined">
            <InputLabel htmlFor="speciality-select">Speciality</InputLabel>
            <Select
              value={this.state.speciality}
              onChange={this.handleChange("speciality")}
              error={this.state.specialityError}
              onFocus={() => this.setState({ specialityError: false })}
              input={
                <OutlinedInput
                  labelWidth={70}
                  name="speciality"
                  id="speciality-select"
                />
              }
              className={classes.select}
            >
              {FILTER1.slice(1).map(option => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="section-select">Section</InputLabel>
            <Select
              value={this.state.section}
              onChange={this.handleChange("section")}
              error={this.state.sectionError}
              onFocus={() => this.setState({ sectionError: false })}
              input={
                <OutlinedInput
                  labelWidth={55}
                  name="section"
                  id="section-select"
                />
              }
              className={classes.select}
            >
              {FILTER2.slice(1).map(option => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="audience-select">Audience</InputLabel>
            <Select
              value={this.state.audience}
              onChange={this.handleChange("audience")}
              error={this.state.audienceError}
              onFocus={() => this.setState({ audienceError: false })}
              input={
                <OutlinedInput
                  labelWidth={70}
                  name="audience"
                  id="audience-select"
                />
              }
              className={classes.select}
            >
              {FILTER3.slice(1).map(option => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={classes.imageContainer}>
            <img
              src={this.state.image}
              alt=""
              className={classes.articleImage}
            />

            <input
              accept="image/*"
              className={classes.input}
              id="button-file"
              type="file"
              onChange={this.onImageChange}
            />
            <label htmlFor="button-file">
              <Button variant="outlined" component="span" color="primary">
                Change
              </Button>
            </label>
          </div>

          <TextField
            label="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange("title")}
            variant="outlined"
            multiline
            margin="normal"
            error={this.state.titleError}
            onFocus={() => this.setState({ titleError: false })}
          />

          <TextField
            label="Content"
            name="title"
            value={this.state.content}
            onChange={this.handleChange("content")}
            variant="outlined"
            multiline
            margin="normal"
            error={this.state.contentError}
            onFocus={() => this.setState({ contentError: false })}
          />

          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.buttonSave}
              onClick={isNew ? this.addArticle : this.saveArticle}
            >
              {isNew ? "Add" : "Save"}
            </Button>

            {isNew ? null : (
              <Button
                variant="outlined"
                className={classes.buttonDelete}
                onClick={() => openModal(CONFIRM_DELETE_ARTICLE)}
              >
                Delete
              </Button>
            )}

            <Button
              variant="outlined"
              color="primary"
              onClick={this.props.history.goBack}
            >
              Go back
            </Button>
          </div>
        </div>

        <Dialog
          open={modalConfirmDeleteArticle}
          onClose={() => closeModal(CONFIRM_DELETE_ARTICLE)}
        >
          <DialogTitle>
            Are you sure you want to delete this article?
          </DialogTitle>

          <DialogActions>
            <Button variant="outlined" onClick={this.deleteArticle}>
              Yes
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                closeModal(CONFIRM_DELETE_ARTICLE);
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: {
    margin: 10,
    maxWidth: 520,
    "@media (min-width: 545px)": {
      margin: "10px auto",
      marginTop: 50
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    margin: "0 auto",
    padding: 10
  },
  title: {
    margin: 20
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    "@media (min-width: 450px)": {
      flexDirection: "row"
    }
  },
  articleImage: {
    objectFit: "cover",
    width: 280,
    height: 190,
    marginBottom: 10
  },
  input: {
    display: "none"
  },
  select: {
    marginBottom: 20,
    color: theme.palette.primary.dark
  },
  buttons: {
    margin: "15px 0"
  },
  buttonSave: {
    marginRight: 7
  },
  buttonDelete: {
    marginRight: 7,
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  }
});

EditArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  modalConfirmDeleteArticle: PropTypes.bool.isRequired,
  addArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const EditArticleComponent = withStyles(styles)(EditArticle);

export default EditArticleComponent;
