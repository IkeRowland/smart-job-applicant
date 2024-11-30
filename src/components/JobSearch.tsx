import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import JobList from './JobList';

export default function JobSearch() {
  const [filters, setFilters] = useState({
    keywords: '',
    location: '',
    remote: false,
    experience: 'any'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Smart Job Search Assistant
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Let AI help you find and apply to your next opportunity
            </p>
          </div>

          <div className="mt-10">
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow">
                <input
                  type="text"
                  className="block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Job title, keywords, or company"
                  value={filters.keywords}
                  onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
                />
              </div>
              <div className="relative flex items-stretch flex-grow">
                <input
                  type="text"
                  className="block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
              >
                <MagnifyingGlassIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Search
              </button>
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={filters.remote}
                  onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-600">Remote</span>
              </label>

              <select
                className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
              >
                <option value="any">Any Experience</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
          </div>

          <JobList />
        </div>
      </div>
    </div>
  );
}