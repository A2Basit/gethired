import React, { useState } from 'react';

const FilterOptions = ({ onFilter }) => {
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const handleFilter = () => {
    onFilter({ jobType, salaryRange });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center w-full p-4 bg-white shadow-md rounded-md mt-4">
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="w-full sm:w-1/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Job Type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="internship">Internship</option>
      </select>
      <select
        value={salaryRange}
        onChange={(e) => setSalaryRange(e.target.value)}
        className="w-full sm:w-1/5 p-2 mt-4 sm:mt-0 sm:ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Salary Range</option>
        <option value="0-10000">0 - 10,000</option>
        <option value="10000-20000">10,000 - 20,000</option>
        <option value="20000-30000">20,000 - 30,000</option>
        <option value="30000+">30,000+</option>
      </select>
      <button
        type="button"
        onClick={handleFilter}
        className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterOptions;
