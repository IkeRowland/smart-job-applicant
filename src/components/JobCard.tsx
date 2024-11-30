import React from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  posted: string;
  isRemote?: boolean;
  applicantReviewTime?: string;
  logo: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="flex-shrink-0 w-12 h-12 mr-4">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
          <p className="text-sm text-gray-500">
            {job.location} {job.isRemote && '(Remote)'}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <svg 
            className="w-4 h-4 mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Easy Apply
        </button>
        <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          <svg 
            className="w-4 h-4 mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          Save
        </button>
      </div>

      {job.applicantReviewTime && (
        <div className="mt-4">
          <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">
            Applicant review time is typically {job.applicantReviewTime}
          </span>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Posted {job.posted}
      </div>
    </div>
  );
}