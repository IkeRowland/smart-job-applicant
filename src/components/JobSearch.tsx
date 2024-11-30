'use client';

import { useState } from 'react';
import JobList from './JobList';

export default function JobSearch() {
  const [searchParams, setSearchParams] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle traditional search without OpenAI
    console.log('Searching with params:', searchParams);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <input 
            type="text" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Title, skill or company" 
            value={searchParams.title}
            onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
            autoFocus 
          />
        </div>
        <div className="flex-1">
          <input 
            type="text" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Location" 
            value={searchParams.location}
            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <select 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={searchParams.jobType}
            onChange={(e) => setSearchParams({ ...searchParams, jobType: e.target.value })}
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>
        <div className="flex-1">
          <select 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchParams.salary}
            onChange={(e) => setSearchParams({ ...searchParams, salary: e.target.value })}
          >
            <option value="">Select Salary Range</option>
            <option value="0-50000">$0 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000-150000">$100,000 - $150,000</option>
            <option value="150000+">$150,000+</option>
          </select>
        </div>
        <button 
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Find Job
        </button>
      </form>
      <JobList />
    </div>
  );
}