import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({filterName, filterData}) => (
    <select className="filter-input" onChange={filterName}>
        { filterData.map((el,i)=>{return <option key={i}> {el}</option>})}
     </select>
);

Filter.propTypes = {
    filterName: PropTypes.func.isRequired,
    filterData: PropTypes.array.isRequired
};

export default Filter

