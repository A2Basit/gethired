import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import JobCard from '../components/JobCard';
import MainJobDescription from '../components/mainJobDescription';
// Import other components here as you create them

const JobPostings = () => {
  const [jobs, setJobs] = useState([
    // This is sample data, you would replace it with real data from your backend
    {
      id: 1,
      title: 'Paid Web Developer/IT Intern',
      company: 'Rankobiz',
      location: 'Lahore',
      salary: 'Rs 10,000 - Rs 15,000 a month',
      description: 'Candidate should have a good understanding of front-end languages...',
      fullDescription: 'The candidate should have a thorough understanding of front-end development including HTML, CSS, JavaScript, and related frameworks. Experience in developing responsive designs and working with REST APIs is a plus. Responsibilities include designing and implementing new features, optimizing existing code, and collaborating with the team.',
      type: 'Full-time',
      postedDate: 'Just posted',
    },
    // Add more job objects here
  ]);

  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearch = (keywords, location) => {
    console.log('Searching for:', keywords, location);
    // Implement the logic to fetch jobs based on search criteria
  };

  const handleFilter = (filters) => {
    console.log('Applying filters:', filters);
    // Implement the logic to filter jobs based on the selected filters
  };

  const handleJobClick = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    setSelectedJob(job);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FilterOptions onFilter={handleFilter} />
      <div className="flex mt-4">
        <div className="w-full sm:w-1/3 lg:w-2/5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={handleJobClick} />
          ))}
        </div>
        <div className="w-full sm:w-2/3 lg:w-3/5">
          <MainJobDescription job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
