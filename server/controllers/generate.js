import { GoogleGenerativeAI } from "@google/generative-ai";

export const generate = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const data = req.body.data;
    const chatHistory = req.body.chatHistory;
    const role = req.body.role;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
      systemInstruction: `You are a highly skilled ${role} that can detect and identify trends in data. You will provide comprehensive and actionable analysis based on the provided data, considering potential biases and ethical implications. Focus on clarity, conciseness, and relevance in your responses. remove '*' from your response`,
    });

    const customPrompt = `
    prompt: ${prompt}
    data: ${JSON.stringify(data)}
    this is the chat history: ${JSON.stringify(chatHistory)}
    `;

    console.log(customPrompt);
    const result = await model.generateContentStream(customPrompt);

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
