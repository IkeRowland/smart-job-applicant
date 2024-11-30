'use client';

import { useState } from 'react';
import JobSearch from './JobSearch';
import JobList from './JobList';

interface SearchQuery {
  title: string;
  location: string;
  jobType: string;
  salary: string;
}

export default function JobLayout() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    title: '',
    location: '',
    jobType: '',
    salary: ''
  });

  const handleSearch = (query: SearchQuery) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <JobSearch onSearch={handleSearch} />
      <JobList searchQuery={searchQuery} />
    </div>
  );
}
