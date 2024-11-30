import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://jobicy.com/?feed=job_feed';

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

    // Build RSS URL with parameters
    const rssUrl = new URL(RSS_URL);
    if (query) {
      rssUrl.searchParams.set('search_keywords', query);
    }
    if (location) {
      rssUrl.searchParams.set('search_region', location);
    }

    console.log('Fetching from URL:', rssUrl.toString());

    const response = await fetch(rssUrl.toString(), {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('RSS Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`RSS feed responded with status: ${response.status}`);
    }

    const xmlData = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const rssData = parser.parse(xmlData);
    console.log('RSS Data:', rssData);

    if (!rssData.rss?.channel?.item) {
      console.error('Invalid RSS Format:', rssData);
      throw new Error('Invalid RSS feed format');
    }

    // Ensure items is always an array
    const items = Array.isArray(rssData.rss.channel.item) 
      ? rssData.rss.channel.item 
      : [rssData.rss.channel.item];

    const jobs = items
      .filter(item => {
        // Filter jobs based on search criteria
        const matchesQuery = !query || 
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase());
        
        const matchesLocation = !location ||
          item.location?.toLowerCase().includes(location.toLowerCase());

        return matchesQuery && matchesLocation;
      })
      .map(item => ({
        title: item.title || 'Untitled Position',
        company: item.company || 'Company Not Specified',
        location: item.location || 'Remote',
        link: item.link || '#',
        posted: item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'Recently posted',
        description: item.description || '',
        jobType: item.jobType || 'Not specified',
        salary: item.salary || 'Salary not specified',
        industry: item.category || 'Not specified'
      }));

    console.log('Transformed jobs:', jobs.length);

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