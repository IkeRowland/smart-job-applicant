import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const location = searchParams.get('location');
    
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    
    const page = await browser.newPage();
    await page.goto(`https://www.linkedin.com/jobs/search/?keywords=${query}&location=${location}`);
    
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job-card-container');
      return Array.from(jobElements).map((job: any) => ({
        title: job.querySelector('.job-card-list__title')?.textContent?.trim(),
        company: job.querySelector('.job-card-container__company-name')?.textContent?.trim(),
        location: job.querySelector('.job-card-container__metadata-item')?.textContent?.trim(),
        link: job.querySelector('.job-card-list__title')?.href,
        posted: job.querySelector('.job-card-container__listed-time')?.textContent?.trim()
      }));
    });

    await browser.close();
    
    return NextResponse.json({ jobs });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}