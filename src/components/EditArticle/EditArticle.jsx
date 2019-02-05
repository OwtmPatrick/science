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
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { FILTER1, FILTER2, FILTER3 } from "../../constants";
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
      image: ""
    };
  }

  componentDidMount() {
    const article = this.getArticle();
    if (article) {
      const { section, speciality, audience, title, content, image } = article;
      this.setState({ section, speciality, audience, title, content, image });
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

  getImage = url => {
    let index = url[11];
    if (typeof index !== "undefined") return images[Number(index)];
    return images[0];
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.section);

    console.log(this.props);
    return (
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="h4" color="primary" className={classes.title}>
            Edit article
          </Typography>

          <FormControl variant="outlined">
            <InputLabel htmlFor="speciality-select">Speciality</InputLabel>
            <Select
              value={this.state.speciality}
              onChange={this.handleChange("speciality")}
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
              ref={ref => {
                this.img = ref;
              }}
              src={this.getImage(this.state.image)}
              alt=""
              className={classes.articleImage}
            />

            <input
              ref={ref => {
                this.file = ref;
              }}
              accept="image/*"
              className={classes.input}
              id="button-file"
              type="file"
              onChange={() => {
                const reader = new FileReader();

                reader.onloadend = function() {
                  console.log("ewgew");
                  this.img.src = reader.result;
                };
                // how-to-display-a-image-selected-from-input-type-file-in-reactjs
                console.log(reader);

                // if (this.file) {
                //   reader.readAsDataURL(this.file);
                // }
              }}
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
          />

          <TextField
            label="Title"
            name="title"
            value={this.state.content}
            onChange={this.handleChange("content")}
            variant="outlined"
            multiline
            margin="normal"
          />

          <div className={classes.buttons}>
            <Button variant="outlined" color="primary">
              save
            </Button>

            {/* <Link to="/admin"> */}
            <Button
              variant="outlined"
              color="primary"
              onClick={this.props.history.goBack}
            >
              go back
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: {
    margin: 10
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
  }
});

const EditArticleComponent = withStyles(styles)(EditArticle);

export default EditArticleComponent;
