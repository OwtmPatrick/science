import React, { Component } from "react";
import { AppBar, Typography, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Filter, Article, Pagination } from "../Common";

import { FILTER1, FILTER2, FILTER3 } from "../../constants";
import { generateID } from "../../utils";

class ArticlesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.articles,
      filterText: "",
      filterSpeciality: FILTER1[0].toLowerCase(),
      filterSection: FILTER2[0].toLowerCase(),
      filterAudience: FILTER3[0].toLowerCase(),
      articlesPerPage: 3,
      page: 1
    };
  }

  setFilterText = event => {
    this.setState({
      filterText: event.target.value.toLowerCase()
    });
  };

  setFilterSpeciality = event => {
    this.setState({
      filterSpeciality: event.target.value.toLowerCase()
    });
  };

  setFilterSection = event => {
    this.setState({
      filterSection: event.target.value.toLowerCase()
    });
  };

  setFilterAudience = event => {
    this.setState({
      filterAudience: event.target.value.toLowerCase()
    });
  };

  setViewAll = () => {
    this.setState({
      viewAll: !this.state.viewAll
    });
  };

  filterArticles = () => {
    let articles = this.state.data;

    const {
      filterText,
      filterSpeciality,
      filterSection,
      filterAudience
    } = this.state;

    if (filterText.length) {
      const result  = filterText.split(' ').reduce((res, article) => {
        const filterTitleArticles = articles.filter(article => (
          article.title.toLowerCase().indexOf(filterText) !== -1
        ));

        const filterContentArticles = articles.filter(article => (
          article.content.toLowerCase().indexOf(filterText) !== -1
        ));

        const filterSpecialityArticles = articles.filter(article => (
          article.speciality.toLowerCase().indexOf(filterText) !== -1
        ));
          return res.concat(filterTitleArticles, filterContentArticles, filterSpecialityArticles);
      }, []);
      return result;
    }
    if (filterSpeciality !== "all specialities") {
      articles = articles.filter(article => {
        const handleSearch = filterSpeciality;

        return article.speciality.toLowerCase().indexOf(handleSearch) !== -1;
      });
    }
    if (filterSection !== "all sections") {
      articles = articles.filter(article => {
        const handleSearch = filterSection;

        return article.section.toLowerCase().indexOf(handleSearch) !== -1;
      });
    }
    if (filterAudience !== "all audiences") {
      articles = articles.filter(article => {
        const handleSearch = filterAudience;

        return article.audience.toLowerCase().indexOf(handleSearch) !== -1;
      });
    }

    return articles;
  };

  render() {
    const { classes, admin, errorSetPage, openModal, closeModal } = this.props;
    const { page, articlesPerPage } = this.state;

    const newArticleId = generateID();

    const indexOfLastOrder = page * articlesPerPage;
    const indexOfFirstOrder = indexOfLastOrder - articlesPerPage;
    const currentArticles = this.filterArticles().slice(
      indexOfFirstOrder,
      indexOfLastOrder
    );

    return (
      <div>
        <AppBar position="static" color="default" className={classes.appBar}>
          <div className={classes.container}>
            <div className={classes.containerFilter}>
              <Typography className={classes.filterName}>
                Search the Academy by keyword:
              </Typography>

              <TextField
                variant="outlined"
                className={classes.filterText}
                placeholder="Enter keyword"
                label="Enter keyword"
                onChange={this.setFilterText}
              />
            </div>

            <div className={classes.containerFilter}>
              <Typography className={classes.filterName}>
                Filter content by:
              </Typography>

              <Filter
                value={this.state.filterSpeciality}
                filterName={this.setFilterSpeciality}
                filterData={FILTER1}
              />

              <Filter
                value={this.state.filterSection}
                filterName={this.setFilterSection}
                filterData={FILTER2}
              />

              <Filter
                value={this.state.filterAudience}
                filterName={this.setFilterAudience}
                filterData={FILTER3}
              />
            </div>
          </div>
        </AppBar>

        <div className={classes.container}>
          {admin ? (
            <div className={classes.containerTitle}>
              <Typography className={classes.titleArticles} variant="h4">
                Articles
              </Typography>

              <Link
                to={`/articles/${newArticleId}/new`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.buttonAdd}
                >
                  Add new article
                </Button>
              </Link>
            </div>
          ) : (
            <Typography className={classes.titleArticles} variant="h4">
              Study materials
            </Typography>
          )}

          <div className={classes.articlesList}>
            {currentArticles.map(el => {
              return (
                <Article
                  id={el.id}
                  key={el.id}
                  image={el.image}
                  section={el.section}
                  title={el.title}
                  content={el.content}
                  video={el.video}
                  admin={admin}
                />
              );
            })}
          </div>

          <Pagination
            articles={this.filterArticles()}
            articlesPerPage={articlesPerPage}
            page={page}
            setPage={page => this.setState({ page })}
            onChangeArticlesPerPage={e =>
              this.setState({ articlesPerPage: e.target.value, page: 1 })
            }
            errorSetPage={errorSetPage}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  appBar: {
    padding: "20px 0"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: 960,
    margin: "0 auto"
  },
  containerFilter: {
    width: "calc(100% - 20px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
    "@media (min-width: 1024px)": {
      flexDirection: "row"
    },
    "&:first-child": {
      "@media (min-width: 1024px)": {
        borderBottom: "1px solid #c1b4b4"
      }
    },
    "&:last-child": {
      "@media (min-width: 1024px)": {
        justifyContent: "space-between"
      }
    }
  },
  filterName: {
    fontSize: 16,
    marginBottom: 20,
    color: theme.palette.primary.dark,
    "@media (min-width: 1024px)": {
      marginRight: 25,
      marginBottom: 0
    }
  },
  filterText: {
    width: "100%",
    maxWidth: 450,
    "@media (min-width: 1024px)": {
      maxWidth: 670
    }
  },
  containerTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (min-width: 768px)": {
      flexDirection: "row"
    }
  },
  titleArticles: {
    margin: "20px 0",
    color: theme.palette.primary.dark
  },
  buttonAdd: {
    marginLeft: 15
  },
  articlesList: {
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    height: '100%',
    "@media (min-width: 1024px)": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    }
  }
});

ArticlesListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  errorSetPage: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

const ArticleList = withStyles(styles)(ArticlesListComponent);

export default ArticleList;
