'use client';

import JobSearch from '../components/JobSearch';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Find Your Next Job
        </h1>
        <JobSearch />
      </div>
    </main>
  );
}