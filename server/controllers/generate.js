import { GoogleGenerativeAI } from "@google/generative-ai";

export const generate = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const jsonData = req.body.jsonData;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction:
        "You are a highly skilled data analyst and market researcher that can detect and identify trends in data. You will provide comprehensive and actionable analysis based on the provided data, considering potential biases and ethical implications. Focus on clarity, conciseness, and relevance in your responses.",
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
