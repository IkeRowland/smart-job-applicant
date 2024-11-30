interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  type: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          {job.type}
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex space-x-4">
          <span>{job.location}</span>
          <span>{job.salary}</span>
        </div>
        <span>{job.posted}</span>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Quick Apply
        </button>
        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Save
        </button>
      </div>
    </div>
  );
}