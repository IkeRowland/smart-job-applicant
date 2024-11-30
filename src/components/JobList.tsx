'use client';

import { useState } from 'react';
import JobCard from './JobCard';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  posted: string;
  isRemote?: boolean;
  applicantReviewTime?: string;
  jobType: string;
  salary: string;
}

interface SearchQuery {
  title: string;
  location: string;
  jobType: string;
  salary: string;
}

interface JobListProps {
  searchQuery?: SearchQuery;
}

export default function JobList({ searchQuery = { title: '', location: '', jobType: '', salary: '' } }: JobListProps) {
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Digital Marketing Manager",
      company: "diginu",
      location: "South Africa",
      posted: "3 hours ago",
      isRemote: true,
      applicantReviewTime: "1 day",
      jobType: "full-time",
      salary: "50000-100000"
    },
    {
      id: 2,
      title: "Digital Marketing Consultant",
      company: "ITURNEDTOASTAR (Pty) Ltd",
      location: "City of Cape Town, Western Cape, South Africa",
      posted: "8 hours ago",
      isRemote: true,
      jobType: "contract",
      salary: "100000-150000"
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      company: "diginu",
      location: "South Africa",
      posted: "8 hours ago",
      isRemote: true,
      applicantReviewTime: "1 day",
      jobType: "full-time",
      salary: "0-50000"
    }
  ]);

  const filteredJobs = jobs.filter(job => {
    const titleMatch = !searchQuery.title || job.title.toLowerCase().includes(searchQuery.title.toLowerCase());
    const locationMatch = !searchQuery.location || job.location.toLowerCase().includes(searchQuery.location.toLowerCase());
    const jobTypeMatch = !searchQuery.jobType || job.jobType === searchQuery.jobType;
    const salaryMatch = !searchQuery.salary || job.salary === searchQuery.salary;

    return titleMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredJobs.length} Jobs Found
          </h2>
        </div>
        <div className="divide-y">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
          {filteredJobs.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No jobs found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}