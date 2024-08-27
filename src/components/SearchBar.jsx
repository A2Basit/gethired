import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center w-full p-4 bg-white shadow-md rounded-md">
      <input
        type="text"
        placeholder="Job title, keywords, or company"
        className="w-full sm:w-2/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full sm:w-1/5 p-2 mt-4 sm:mt-0 sm:ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Find jobs
      </button>
    </div>
  );
};

export default SearchBar;
