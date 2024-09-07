import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { useAuth } from "../context/AuthProvider";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("job_postings")
          .select("*")
          .eq("employer_id", user.id);

        if (error) throw error;

        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>You need to be logged in to view this page</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
        <a
          href="/employer-job-post"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Post a Job
        </a>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Jobs Created by You
        </h2>
        {jobs.length === 0 ? (
          <p>No Jobs Found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <p className="text-gray-600 mt-2">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      job.status === "Open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
                <div className="mt-4 flex justify-between">
                  <a
                    href={`/employer-job-edit/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    className="text-sm text-white px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => {
                      /* Function to change status */
                    }}
                  >
                    Change Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;