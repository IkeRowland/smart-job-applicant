import { NextResponse } from 'next/server';

// Mock data for testing
const MOCK_JOBS = [
  {
    jobTitle: "Senior Frontend Developer",
    companyName: "TechCorp",
    jobGeo: "United Kingdom",
    url: "https://example.com/job1",
    pubDate: new Date().toISOString(),
    jobExcerpt: "Looking for an experienced frontend developer with React expertise",
    jobType: "Full-time",
    annualSalaryMin: 70000,
    annualSalaryMax: 90000,
    salaryCurrency: "GBP",
    companyLogo: "https://via.placeholder.com/150",
    jobIndustry: "Software Development",
    jobLevel: "Senior"
  },
  {
    jobTitle: "Digital Marketing Manager",
    companyName: "Marketing Pro",
    jobGeo: "USA",
    url: "https://example.com/job2",
    pubDate: new Date().toISOString(),
    jobExcerpt: "Lead our digital marketing initiatives",
    jobType: "Full-time",
    annualSalaryMin: 60000,
    annualSalaryMax: 80000,
    salaryCurrency: "USD",
    companyLogo: "https://via.placeholder.com/150",
    jobIndustry: "Marketing",
    jobLevel: "Manager"
  },
  {
    jobTitle: "SEO Specialist",
    companyName: "Digital Agency",
    jobGeo: "Remote",
    url: "https://example.com/job3",
    pubDate: new Date().toISOString(),
    jobExcerpt: "Help clients improve their search engine rankings",
    jobType: "Contract",
    annualSalaryMin: 50000,
    salaryCurrency: "USD",
    companyLogo: "https://via.placeholder.com/150",
    jobIndustry: "Digital Marketing",
    jobLevel: "Mid-Level"
  },
  {
    jobTitle: "SEO Content Writer",
    companyName: "ContentCo",
    jobGeo: "United Kingdom",
    url: "https://example.com/job4",
    pubDate: new Date().toISOString(),
    jobExcerpt: "Create SEO-optimized content for various clients",
    jobType: "Part-time",
    annualSalaryMin: 30000,
    annualSalaryMax: 40000,
    salaryCurrency: "GBP",
    companyLogo: "https://via.placeholder.com/150",
    jobIndustry: "Content Writing",
    jobLevel: "Entry Level"
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const location = searchParams.get('location');

    console.log('Search params:', { query, location });

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Filter jobs based on search criteria
    const filteredJobs = MOCK_JOBS.filter(job => {
      const matchesQuery = job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
                          job.jobExcerpt.toLowerCase().includes(query.toLowerCase()) ||
                          job.jobIndustry.toLowerCase().includes(query.toLowerCase());

      const matchesLocation = !location || 
                            job.jobGeo.toLowerCase().includes(location.toLowerCase()) ||
                            job.jobGeo.toLowerCase() === 'remote' ||
                            (location.toLowerCase() === 'uk' && job.jobGeo.toLowerCase().includes('united kingdom')) ||
                            (location.toLowerCase() === 'usa' && job.jobGeo.toLowerCase().includes('usa'));

      return matchesQuery && matchesLocation;
    });

    // Transform jobs to match frontend expectations
    const jobs = filteredJobs.map(job => ({
      title: job.jobTitle,
      company: job.companyName,
      location: job.jobGeo,
      link: job.url,
      posted: new Date(job.pubDate).toLocaleDateString(),
      description: job.jobExcerpt,
      jobType: job.jobType,
      salary: job.annualSalaryMin ? 
        `${job.annualSalaryMin}${job.annualSalaryMax ? ' - ' + job.annualSalaryMax : '+'} ${job.salaryCurrency}/year` 
        : 'Salary not specified',
      companyLogo: job.companyLogo,
      industry: job.jobIndustry,
      level: job.jobLevel
    }));

    if (jobs.length === 0) {
      return NextResponse.json(
        { error: 'No jobs found matching your criteria' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      jobs,
      totalResults: jobs.length
    });
  } catch (error: any) {
    console.error('Job search error:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch jobs',
        details: error.message
      },
      { status: 500 }
    );
  }
}