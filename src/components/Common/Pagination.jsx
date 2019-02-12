import React, { Component } from "react";
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Fab,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { ARTICLES_PER_PAGE, ERROR_SET_PAGE } from "../../constants";

class PagiantionComponent extends Component {
  state = {
    pageNumber: ""
  };

  setPage = e => {
    if (e.key === "Enter") {
      const { pageNumber } = this.state;
      const { articles, articlesPerPage, setPage, openModal } = this.props;
      const allPages = [];

      for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
        allPages.push(i);
      }

      if (!pageNumber) return;

      if (pageNumber.match(/^[0-9]*$/gm) && pageNumber !== "0") {
        if (Number(pageNumber) <= allPages.length) {
          setPage(Number(pageNumber));
        } else setPage(allPages[allPages.length - 1]);

        this.setState({ pageNumber: "" });
        return;
      } else {
        this.setState({ pageNumber: "" });
        openModal(ERROR_SET_PAGE);
      }
    }
  };

  render() {
    const {
      articles,
      articlesPerPage,
      page,
      setPage,
      onChangeArticlesPerPage,
      classes,
      errorSetPage,
      closeModal
    } = this.props;
    const allPages = [];

    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      allPages.push(i);
    }

    const lastPage = allPages[allPages.length - 1];

    const pages = () => {
      if (allPages.length <= 5) {
        return allPages;
      }
      if (page === 1) {
        return [page, page + 1, page + 2, page + 3, page + 4];
      }
      if (page === 2) {
        return [page - 1, page, page + 1, page + 2, page + 3];
      }
      if (page === lastPage - 1) {
        return [page - 3, page - 2, page - 1, page, page + 1];
      }
      if (page === lastPage) {
        return [page - 4, page - 3, page - 2, page - 1, page];
      }
      return [page - 2, page - 1, page, page + 1, page + 2];
    };

    if (!articles.length) return null;

    return (
      <div className={classes.container}>
        <div className={classes.articlesPerPage}>
          <Typography
            variant="h6"
            color="primary"
            className={classes.typography}
          >
            Show by
          </Typography>

          <FormControl variant="outlined">
            <Select
              value={articlesPerPage}
              onChange={onChangeArticlesPerPage}
              input={
                <OutlinedInput
                  labelWidth={0}
                  name="articlesPerPage"
                  id="articlesPerPage-select"
                />
              }
            >
              {ARTICLES_PER_PAGE.map(option => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {allPages.length > 1 && (
          <div className={classes.navigation}>
            <IconButton
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={classes.extremeButton}
            >
              <FirstPage />
            </IconButton>

            <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              <KeyboardArrowLeft />
            </IconButton>

            <div className={classes.pagesNumbers}>
              <div>
                {pages().map(number => (
                  <Fab
                    size="small"
                    key={number}
                    color={number === page ? "primary" : "default"}
                    onClick={() => setPage(number)}
                    className={
                      number === page ? classes.fabActive : classes.fab
                    }
                  >
                    {number}
                  </Fab>
                ))}
              </div>
            </div>

            <IconButton
              onClick={() => setPage(page + 1)}
              disabled={page === lastPage}
              className={classes.nextButton}
            >
              <KeyboardArrowRight />
            </IconButton>

            <IconButton
              onClick={() => setPage(lastPage)}
              disabled={page === lastPage}
              className={classes.extremeButton}
            >
              <LastPage />
            </IconButton>
          </div>
        )}

        {allPages.length > 1 && (
          <TextField
            variant="outlined"
            value={this.state.pageNumber}
            onChange={e => this.setState({ pageNumber: e.target.value })}
            onKeyPress={this.setPage}
            className={classes.searchPage}
          />
        )}

        <Dialog open={errorSetPage} onClose={() => closeModal(ERROR_SET_PAGE)}>
          <DialogTitle>Page number must be a correct number</DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => closeModal(ERROR_SET_PAGE)}
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 20,
    "@media (min-width: 768px)": {
      flexDirection: "row"
    }
  },
  articlesPerPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    "@media (min-width: 768px)": {
      marginBottom: 0,
      marginRight: 20
    }
  },
  typography: {
    marginRight: 20
  },
  navigation: {
    width: "100%",
    "@media (min-width: 425px)": {
      display: "flex",
      alignItems: "center"
    },
    "@media (min-width: 768px)": {
      width: "auto"
    }
  },
  pagesNumbers: {
    position: "absolute",
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "@media (min-width: 425px)": {
      position: "static",
      display: "inline-block"
    }
  },
  fab: {
    color: theme.palette.primary.dark,
    fontSize: 16,
    marginRight: 7
  },
  fabActive: {
    color: "white",
    fontSize: 16,
    marginRight: 7
  },
  nextButton: {
    marginLeft: -7
  },
  extremeButton: {
    padding: 0
  },
  searchPage: {
    width: 85,
    marginTop: 60,
    "@media (min-width: 425px)": {
      marginTop: 20
    },
    "@media (min-width: 768px)": {
      marginTop: 0,
      marginLeft: 10
    }
  }
});

PagiantionComponent.propTypes = {
  articles: PropTypes.array.isRequired,
  articlesPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangeArticlesPerPage: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export const Pagination = withStyles(styles)(PagiantionComponent);
