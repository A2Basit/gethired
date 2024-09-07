import React,{useState} from 'react';

const SearchBar = ({onSearch}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const title = document.querySelector('input[placeholder="Job title, keywords, or company"]').value;
    const location = document.querySelector('input[placeholder="Location"]').value;
    onSearch(title, location);
  };
      return (
    <div className="flex flex-col sm:flex-row justify-center items-center w-full p-4 bg-white shadow-md rounded-md sm:mt-0">
      <input
        type="text"
        placeholder="Job title, keywords, or company"
        className="w-full sm:w-2/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full sm:w-1/5 p-2 mt-4 sm:mt-0 sm:ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        type="button"
        className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSearch}
      >
        Find jobs
      </button>
    </div>
  );
};

export default SearchBar;