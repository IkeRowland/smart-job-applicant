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
}

export default function JobList() {
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Digital Marketing",
      company: "diginu",
      location: "South Africa",
      posted: "3 hours ago",
      isRemote: true,
      applicantReviewTime: "1 day"
    },
    {
      id: 2,
      title: "Digital Marketing Consultant",
      company: "ITURNEDTOASTAR (Pty) Ltd",
      location: "City of Cape Town, Western Cape, South Africa",
      posted: "8 hours ago",
      isRemote: true
    },
    {
      id: 3,
      title: "Digital marketing team",
      company: "diginu",
      location: "South Africa",
      posted: "8 hours ago",
      isRemote: true,
      applicantReviewTime: "1 day"
    }
  ]);

  return (
    <div className="bg-white border rounded">
      <div className="p-4 border-b">
        <h2 className="text-base font-medium">Digital marketing</h2>
        <p className="text-sm text-gray-600">South Africa</p>
      </div>
      <div>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className="p-4 text-center border-t">
        <button className="text-blue-600 hover:underline text-sm">Show all</button>
      </div>
    </div>
  );
}