import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCoverLetter(
  jobDescription: string,
  userProfile: any
) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at writing compelling cover letters.'
        },
        {
          role: 'user',
          content: `Write a cover letter for this job description: ${jobDescription}\n\nCandidate profile: ${JSON.stringify(userProfile)}`
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw error;
  }
}

export async function generateJobAnswers(
  questions: string[],
  userProfile: any
) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at crafting professional job application responses.'
        },
        {
          role: 'user',
          content: `Answer these job application questions: ${JSON.stringify(questions)}\n\nCandidate profile: ${JSON.stringify(userProfile)}`
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating answers:', error);
    throw error;
  }
}