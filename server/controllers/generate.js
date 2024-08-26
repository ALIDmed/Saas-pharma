import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";

export const generate = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const data = req.body.data;
    const chatHistory = req.body.chatHistory;
    const role = req.body.role;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
      systemInstruction: `You are a highly skilled ${role} that can detect and identify trends in data. Make sure to only analyse the data without considering its source. You will provide comprehensive and actionable analysis based on the provided data. Focus on clarity, conciseness, and relevance in your responses.`,
    });

    const customPrompt = `
    prompt: ${prompt}
    data: ${JSON.stringify(data)}
    this is the chat history: ${JSON.stringify(chatHistory)}
    `;

    const converter = new showdown.Converter();
    // const result = await model.generateContentStream(customPrompt);
    const result = await model.generateContent(customPrompt);

    // res.setHeader("Content-Type", "text/plain");
    // res.setHeader("Transfer-Encoding", "chunked");

    // for await (const chunk of result.stream) {
    //   const chunkText = chunk.text();
    //   const convertedChunk = converter.makeHtml(chunkText);
    //   res.write(convertedChunk);
    // }
    // res.end();
    const response = await result.response;
    const text = response.text();
    const convertedText = converter.makeHtml(text);
    res.status(200).json({ message: convertedText });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
