import React, { Component } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Fab,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Paper
} from "@material-ui/core";
import {
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

  goToPage = () => {
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

  setPage = e => {
    if (e.key === "Enter") {
      this.goToPage();
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
            variant="subtitle2"
            color="primary"
            className={classes.showBy}
          >
            Show by:
          </Typography>

          <FormControl variant="outlined">
            <Select
              value={articlesPerPage}
              onChange={onChangeArticlesPerPage}
              className={classes.select}
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
            <Button
              color='primary'
              variant='outlined'
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              first
            </Button>

            <IconButton 
              size='small'
              onClick={() => setPage(page - 1)} 
              disabled={page === 1}
              className={classes.prevButton}
            >
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
              size='small'
              onClick={() => setPage(page + 1)}
              disabled={page === lastPage}
              className={classes.nextButton}
            >
              <KeyboardArrowRight />
            </IconButton>

            <Button
              color='primary'
              variant='outlined'
              onClick={() => setPage(lastPage)}
              disabled={page === lastPage}
            >
              last
            </Button>
          </div>
        )}

        {allPages.length > 1 && (
          <div className={classes.pageInfo}>
            <Paper className={classes.paper}>
              <Typography variant='subtitle1' className={classes.select}>
                {`Page ${page} of ${allPages.length}`}
              </Typography>
            </Paper>

            <div className={classes.goToPage}>
              <Typography variant='subtitle2' className={classes.select}>Go to</Typography>

              <TextField
                value={this.state.pageNumber}
                onChange={e => this.setState({ pageNumber: e.target.value })}
                onKeyPress={this.setPage}
                className={classes.searchPage}
              />

              <Button
                color='primary'
                variant='outlined'
                onClick={this.goToPage}
              >
              go
            </Button>
            </div>
          </div>
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
    margin: "20px 10px",
    "@media (min-width: 900px)": {
      flexDirection: "row",
      width: '100%',
      padding: '0 15px'
    }
  },
  showBy: {
    width: 60
  },
  select: {
    color: theme.palette.primary.dark
  },
  articlesPerPage: {
    marginBottom: 20,
    "@media (min-width: 900px)": {
      marginBottom: 0,
      marginRight: 25
    }
  },
  navigation: {
    width: "100%",
    "@media (min-width: 500px)": {
      display: "flex",
      alignItems: "center"
    },
    "@media (min-width: 900px)": {
      margin: "0 10px"
    },
  },
  pagesNumbers: {
    position: "absolute",
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 15,
    "@media (min-width: 500px)": {
      position: "static",
      display: "inline-block",
      width: 'auto',
      margin: 0
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
  pageInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 80,
    "@media (min-width: 500px)": {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20
    },
    "@media (min-width: 900px)": {
        width: '60%',
        margin: 0
      }
  },
  paper: {
    padding: '5px 10px',
  },
  goToPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 140,
    marginTop: 20,
    "@media (min-width: 500px)": {
      flexDirection: 'row',
      width: 160,
      height: 'auto',
      marginTop: 0,
    },
   
  },
  prevButton: {
    padding: 5,
    margin: '0 5px'
  },
  nextButton: {
    padding: 5,
    margin: '0 5px',
    marginLeft: -3
  },
  searchPage: {
    width: 50
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
