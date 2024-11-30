'use client';

import { useState } from 'react';

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  posted: string;
  salary?: string;
  description?: string;
  jobType?: string;
  companyLogo?: string;
  industry?: string;
  level?: string;
}

interface SearchQuery {
  query: string;
  location: string;
}

export default function JobSearch() {
  const [searchParams, setSearchParams] = useState<SearchQuery>({
    query: '',
    location: ''
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/jobs?query=${encodeURIComponent(searchParams.query)}&location=${encodeURIComponent(searchParams.location || '')}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setJobs(data.jobs || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Job title, skill, or keyword" 
              value={searchParams.query}
              onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
              autoFocus 
            />
          </div>
          <div className="flex-1">
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Location (optional)" 
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            />
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Find Remote Jobs'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-6">
        {jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  {job.companyLogo && (
                    <img 
                      src={job.companyLogo} 
                      alt={`${job.company} logo`}
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-base text-gray-600 mt-1">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.location}
                      </span>
                      {job.jobType && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.jobType}
                        </span>
                      )}
                      {job.level && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {job.level}
                        </span>
                      )}
                      {job.industry && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {job.industry}
                        </span>
                      )}
                    </div>
                    {job.description && (
                      <p className="text-sm text-gray-600 mt-3">{job.description}</p>
                    )}
                    {job.salary && (
                      <p className="text-sm font-medium text-gray-900 mt-2">{job.salary}</p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-gray-500">Posted: {job.posted}</p>
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && !error && (
          <div className="text-center text-gray-500">
            Enter a search term to find remote jobs
          </div>
        )}
      </div>
    </div>
  );
}