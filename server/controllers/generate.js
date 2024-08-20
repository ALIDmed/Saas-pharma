import { GoogleGenerativeAI } from "@google/generative-ai";

export const generate = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const jsonData = req.body.jsonData;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
      systemInstruction: `You are a highly skilled data analyst and market researcher that can detect and identify trends in data. You will provide comprehensive and actionable analysis based on the provided data, considering potential biases and ethical implications. Focus on clarity, conciseness, and relevance in your responses. make sure to use html tags instead of markdown for better formatting. for example <ul> and <li> instead of stars and dashes.`,
    });

    const result = await model.generateContentStream(prompt);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
