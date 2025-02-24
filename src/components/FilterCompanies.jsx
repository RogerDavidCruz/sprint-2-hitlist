import React from 'react';

const FilterCompanies = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor="filter">Filter companies by name: </label>
    <input
      id="filter"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Type to filter..."
    />
  </div>
);

export default FilterCompanies;
