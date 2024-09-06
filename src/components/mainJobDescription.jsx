import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
const MainJobDescription = ({ job }) => {
  const {user, userRole} = useAuth();
  const navigate = useNavigate();
  const handleApply = () => {
    if (!user || userRole !== "job_seeker") {
      navigate("/login", { state: { from: "/ApplyJob" } });
    } else {
      navigate("/ApplyJob");
    }
  };
  const handleSaveJob = () => {
    if (!user || userRole !== "job_seeker") {
      navigate("/login", { state: { from: window.location.pathname } });
    } else {
      alert("Job saved successfully");
    }
  };
  if (!job) {
    return (
      <div className="text-center mt-4 text-gray-500">
        Select a job to view details
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full sm:w-2/3 lg:w-3/5 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-lg text-gray-600 mt-2">
        {job.company} - {job.location}
      </p>
      <p className="text-sm text-gray-500 mt-2">{job.salary}</p>
      <div className="mt-4">
        <h3 className="font-bold text-gray-800">Description</h3>
        <p className="text-gray-600 mt-2">{job.fullDescription}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-gray-800">Requirements</h3>
        <p className="text-gray-600 mt-2">{job.requirements}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-gray-800">Other Details</h3>
        <p className="text-gray-600 mt-2">{job.otherDetails}</p>
      </div>
      <div className="mt-6 flex justify-start space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleApply}
        >
          Apply Now
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleSaveJob}
        >
          Save Job
        </button>
      </div>
    </div>
  );
};

export default MainJobDescription;
