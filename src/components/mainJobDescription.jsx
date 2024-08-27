import React from 'react';

const MainJobDescription = ({ job }) => {
  if (!job) {
    return <div className="text-center mt-4 text-gray-500">Select a job to view details</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full sm:w-2/3 lg:w-3/5 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-lg text-gray-600 mt-2">{job.company} - {job.location}</p>
      <p className="text-sm text-gray-500 mt-2">{job.salary}</p>
      <p className="text-gray-600 mt-4">{job.fullDescription}</p>
      <div className="mt-6 flex justify-start space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Now
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Save Job
        </button>
      </div>
    </div>
  );
};

export default MainJobDescription;
