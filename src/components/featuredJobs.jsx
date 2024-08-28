import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import { Link,useNavigate } from "react-router-dom";
const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const start = (currentPage - 1) * jobsPerPage;
        const end = start + jobsPerPage - 1;

        const { data, error } = await supabase
          .from("job_postings")
          .select("title, company, description")
          .range(start, end);

        if (error) {
          throw error;
        }

        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleCardClick = (id) => {
    navigate(`/jobPostings/${id}`);
  };

  return (
    <div className="flex flex-col items-start justify-start w-max bg-white box-border ">
      <div className="text-left md:w-full px-8">
        <h2 className="text-4xl font-bold text-gray-800 overflow-hidden">
          Featured Jobs
        </h2>
        <Link to="/jobPostings" className="text-blue-500 hover:underline ">
          All jobs
        </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 ">
            
            {jobs.map((job, index) => (
              <div
                key={index}
                className="relative p-4 border-b-2 border-blue-500 rounded-lg shadow-md hover:shadow-lg-2xl cursor-pointer"
                onClick={() => handleCardClick(index + 1)}
              >
                <h3 className="text-2xl font-bold mb-2 ">{job.title}</h3>
                <p className="text-lg text-gray-600 mb-2 ">{job.company}</p>
                <p className="text-gray-600 ">{job.description}</p>
              </div>
            ))}
          </div>
        <div className="flex justify-between mt-6 ">
          <button
            onClick={handlePreviousPage}
            className="px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none "
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
