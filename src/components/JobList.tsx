import { useState } from 'react';
import JobCard from './JobCard';

export default function JobList() {
  // This would typically come from an API
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$120,000 - $160,000',
      posted: '2d ago',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      posted: '3d ago',
      type: 'Full-time',
    },
  ]);

  return (
    <div className="mt-8 space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}