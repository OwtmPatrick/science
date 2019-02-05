import React, { Component } from "react";
import { AppBar, Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Filter, Article, View } from "../Common";

import { FILTER1, FILTER2, FILTER3 } from "../../constants";

class ArticlesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.articles,
      filterText: "",
      filterSpeciality: FILTER1[0].toLowerCase(),
      filterSection: FILTER2[0].toLowerCase(),
      filterAudience: FILTER3[0].toLowerCase(),
      viewAll: false
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
      articles = articles.filter(article => {
        const handleSearch = filterText;

        return (
          article.title.toLowerCase().indexOf(handleSearch) !== -1 ||
          article.content.toLowerCase().indexOf(handleSearch) !== -1
        );
      });
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
    const { classes, admin } = this.props;

    let articles = this.state.viewAll
      ? this.filterArticles()
      : this.filterArticles().slice(0, 3);

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
          <Typography className={classes.titleArticles} variant="h4">
            {admin ? "Articles" : "Study materials"}
          </Typography>

          <div className={classes.articlesList}>
            {articles.map(el => {
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

          <View updateView={this.setViewAll} />
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
  titleArticles: {
    margin: "20px 0",
    color: theme.palette.primary.dark
  },
  articlesList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 1024px)": {
      flexDirection: "row",
      flexWrap: "wrap"
    }
  }
});

const ArticleList = withStyles(styles)(ArticlesListComponent);

export default ArticleList;
