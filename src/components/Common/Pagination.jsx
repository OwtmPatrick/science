import React from "react";
import { 
  FormControl, 
  Select, 
  OutlinedInput, 
  MenuItem, 
  Fab, 
  IconButton, 
  Typography
} from "@material-ui/core";
import { KeyboardArrowLeft ,KeyboardArrowRight } from '@material-ui/icons';
import { withStyles } from "@material-ui/core/styles";

import { ARTICLES_PER_PAGE } from "../../constants";

const PagiantionComponent = ({ 
  articles, 
  articlesPerPage, 
  page, 
  setPage, 
  onChangeArticlesPerPage,
  classes 
}) => {
    const allPages = [];

    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      allPages.push(i);
    }

    const lastPage = allPages[allPages.length - 1];

    const pages = () => {
      if (page === 1) {
        return [page, page + 1, page + 2]
      }

      if (page === lastPage) {
        return [lastPage - 2, lastPage - 1, lastPage]
      }

      return [page - 1, page, page + 1]
    }

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
          

          <div>
            <IconButton 
              onClick={() => setPage(page - 1)}  
              disabled={page === 1}
            >
              <KeyboardArrowLeft />
            </IconButton>

            {pages().map(number => (
              <Fab 
                key={number} 
                color={number === page ? 'primary' : 'default'}
                onClick={() => setPage(number)}
                className={number === page ? classes.fabActive : classes.fab}
              >
                {number}
              </Fab>
            ))}

            <IconButton 
              onClick={() => setPage(page + 1)} 
              disabled={page === lastPage}
              className={classes.nextButton}
            >
              <KeyboardArrowRight />
            </IconButton>
          </div>
        </div>
    )
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    "@media (min-width: 768px)": {
      flexDirection: 'row'
    }
  },
  articlesPerPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  typography: {
    marginRight: 20
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
  }
});

export const Pagination = withStyles(styles)(PagiantionComponent);