import React from 'react';

const ApplyJob = () => {
  const handleApply = () => {
    console.log("Apply Job");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleApply}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Now
      </button>
    </div>
  );
};

export default ApplyJob;