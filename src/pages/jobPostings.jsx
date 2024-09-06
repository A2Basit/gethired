import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import JobCard from '../components/JobCard';
import MainJobDescription from '../components/MainJobDescription';
import { supabase } from '../../supabase/config';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { error, data } = await supabase.from('job_postings').select('*');
        if (error) {
          throw error;
        }
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = async (keywords, location) => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .ilike('title', `%${keywords}%`)
        .ilike('location', `%${location}%`);
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleFilter = async (filters) => {
    try {
      let query = supabase.from('job_postings').select('*');
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.salary) {
        query = query.gte('salary', filters.salary);
      }
      const { data, error } = await query;
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error('Error filtering jobs:', error);
    }
  };

  const handleJobClick = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    setSelectedJob(job);
  };

  return (
    <div className="p-4 mt-5">
      <SearchBar onSearch={handleSearch} />
      <FilterOptions onFilter={handleFilter} />
      <div className="flex flex-wrap mt-4">
        <div className="w-full sm:w-1/2 lg:w-2/5 mb-4 sm:mb-0">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={handleJobClick} />
          ))}
        </div>
        <div className="w-full sm:w-1/2 lg:w-3/5">
          <MainJobDescription job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default JobPostings;