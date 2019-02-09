import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { toCapitalize } from "../../utils";

const FilterComponent = ({ value, filterName, filterData, classes }) => {
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        className={classes.select}
        value={toCapitalize(value)}
        onChange={filterName}
        input={<OutlinedInput labelWidth={0} />}
      >
        {filterData.map(el => {
          return (
            <MenuItem value={el} key={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const styles = theme => ({
  formControl: {
    width: "100%",
    maxWidth: 450,
    marginBottom: 10,
    "@media (min-width: 1024px)": {
      width: 250,
      margin: 0
    }
  },
  select: {
    color: theme.palette.primary.dark
  }
});

export const Filter = withStyles(styles)(FilterComponent);

Filter.propTypes = {
  filterName: PropTypes.func.isRequired,
  filterData: PropTypes.array.isRequired
};
