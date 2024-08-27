import React from 'react';

const JobCard = ({ job, onClick }) => {
  return (
    <div 
      className="flex flex-col p-4 bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-100 transition"
      onClick={() => onClick(job.id)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
        <span className="text-sm font-medium text-blue-600">{job.salary}</span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{job.company} - {job.location}</p>
      <p className="text-sm text-gray-600 mt-2 truncate">{job.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">{job.type}</span>
        <span className="text-xs text-gray-400">{job.postedDate}</span>
      </div>
    </div>
  );
};

export default JobCard;
