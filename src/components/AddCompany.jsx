import React, { useState } from 'react';

const AddCompany = ({ addCompany }) => {
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (companyName.trim()) {
      addCompany(companyName);
      setCompanyName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Add new company"
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
};

export default AddCompany;
