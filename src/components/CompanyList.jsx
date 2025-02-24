import React from 'react';

const CompanyList = ({ companies, deleteCompany }) => (
  <ul>
    {companies.map(company => (
      <li key={company.id}>
        {company.name}{' '}
        <button onClick={() => deleteCompany(company.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default CompanyList;
