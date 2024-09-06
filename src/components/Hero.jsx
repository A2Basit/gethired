import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import "./overflow.css";
const Hero = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error, data } = await supabase
        .from("jobs")
        .select("*")
        .ilike("title", `%${searchQuery}%`);
      console.log(data);
      if (data.length === 0) {
        setMessage("No jobs found");
        setJobs([]);
      } else {
        setJobs(data);
        setMessage("");
      }
      navigate("/jobPostings", { state: { jobs: data, searchQuery } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <section className="flex flex-col items-center justify-center h-full bg-white px-4 py-12 text-center md:flex-row md:text-left md:px-8">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-4xl font-bold mb-4">
            Find The <span className="text-pink-500">Best Jobs</span> Around
            You!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            One search, thousands of job opportunities.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://yulys.com/assets/index_image-2fbe80e4e33ff8bea1c5e7f4df3206a0cbf7e3e098305a3faa6ac1eab2df89fc.webp"
            alt="Job Search Illustration"
            className="w-full h-auto md:w-3/4 lg:w-2/3"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
