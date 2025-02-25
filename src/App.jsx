import React, { useState, useEffect } from 'react';
import companyService from './services/companies';
import FilterCompanies from './components/FilterCompanies';
import AddCompany from './components/AddCompany';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    companyService
      .getAll()
      .then(initialCompanies => {
        setCompanies(initialCompanies);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
        setError('Failed to fetch companies.');
      });
  }, []);

  const addCompany = (companyName) => {
    const newCompany = { name: companyName };
    companyService
      .create(newCompany)
      .then(returnedCompany => {
        setCompanies(companies.concat(returnedCompany));
      })
      .catch(error => {
        console.error('Error adding company:', error);
        setError('Failed to add company.');
      });
  };

  const deleteCompany = (id) => {
    if (window.confirm('Delete this company?')) {
      companyService
        .remove(id)
        .then(() => {
          setCompanies(companies.filter(company => company.id !== id));
        })
        .catch(error => {
          console.error('Error deleting company:', error);
          setError('Failed to delete company.');
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(filter.toLowerCase())
  );

  // sorting considering numeric parts of string, case differences, and special characters
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
      : b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' });
  });

  return (
    <div className="app-container">
      <h1>Hitlist of Companies</h1>
      {error && <p className="error">{error}</p>}

      <FilterCompanies filter={filter} handleFilterChange={handleFilterChange} />
      <AddCompany addCompany={addCompany} />

      <div className="sort-buttons" style={{ marginTop: '1rem' }}>
        <button onClick={() => setSortOrder('asc')}>Sort A-Z</button>
        <button onClick={() => setSortOrder('desc')}>Sort Z-A</button>
      </div>

      <div className="columns-container">
        <div className="column">
          <div className="column-header">
            <span>Company - </span>
            <span> {filteredCompanies.length} Jobs</span>
          </div>
          <ul className="company-list">
            {sortedCompanies.map(company => (
              <li key={company.id} className="company-tile">
                <span>{company.name}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteCompany(company.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="column">
          <div className="column-header">
            <span>Job Posting URL</span>
          </div>
          <ul className="company-list">
            {/* Currently empty – job posting URLs will go here */}
          </ul>
        </div>

        <div className="column">
          <div className="column-header">
            <span>Coffee Chat</span>
          </div>
          <ul className="company-list">
            {/* Currently empty – schedule coffee chats will go here */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
