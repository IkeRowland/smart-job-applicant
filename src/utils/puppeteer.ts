import puppeteer from 'puppeteer';

export async function submitApplication(jobUrl: string, applicationData: any) {
  const browser = await puppeteer.launch({
    headless: false
  });

  try {
    const page = await browser.newPage();
    await page.goto(jobUrl);

    // Click apply button
    await page.click('[data-automation-id="apply-now-btn"]');

    // Fill in application form
    for (const [field, value] of Object.entries(applicationData)) {
      const selector = `[data-automation-id="${field}"]`;
      await page.waitForSelector(selector);
      await page.type(selector, value as string);
    }

    // Submit application
    await page.click('[data-automation-id="submit-application-btn"]');

    // Wait for confirmation
    await page.waitForSelector('[data-automation-id="application-success"]');

    return { success: true };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  } finally {
    await browser.close();
  }
}