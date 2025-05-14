// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4', // sau 'gpt-3.5-turbo'
      messages,
    });

    const responseMessage = chatCompletion.choices[0]?.message?.content;
    res.status(200).json({ message: responseMessage });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
