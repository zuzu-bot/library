const axios = require('axios');

/**
 * Simulates an AI service to fetch book summary and genre.
 * In a real-world scenario, you would call OpenAI, Gemini, or another AI API.
 */
exports.getBookMetadata = async (bookTitle, author) => {
  console.log(`Fetching AI summary for: ${bookTitle} by ${author}`);

  // Use a mock response if no API key is provided
  if (!process.env.AI_API_KEY) {
    return {
      summary: `This is an AI-generated summary for "${bookTitle}". It explores the key themes and narratives presented by ${author}, providing a comprehensive overview of the book's content.`,
      genre: 'General Information' // Placeholder
    };
  }

  // Example for Gemini API (if configured)
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.AI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Provide a brief summary and a single-word genre for the book titled "${bookTitle}" by ${author}. Return JSON format: {"summary": "...", "genre": "..."}`
          }]
        }]
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { summary: text, genre: 'Unknown' };
  } catch (err) {
    console.error('AI Service Error:', err.message);
    return {
      summary: 'AI summary currently unavailable.',
      genre: 'Unknown'
    };
  }
};
