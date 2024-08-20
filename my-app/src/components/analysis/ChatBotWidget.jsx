import { AnalysisContext } from "@/pages/Analysis";
import path from "path";
import React, { useContext } from "react";
import ChatBot from "react-chatbotify";

const ChatBotWidget = () => {
  const { chartData } = useContext(AnalysisContext);
  const options = ["Data Analyst", "Market Researcher", "Ai Assistant"];

  const handleLLMChat = async (params) => {
    try {
      const response = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: params.userInput, data: chartData }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let text = "";

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunkText = decoder.decode(value, { stream: !done });
          text += chunkText;
          params.streamMessage(text);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const settings = {
    botBubble: { simStream: true },
    userBubble: { dangerouslySetInnerHtml: true },
    botBubble: { dangerouslySetInnerHtml: true },
    general: {
      fontFamily: "Inter",
    },
  };

  const flow = {
    start: {
      message: "Hey there 👋! I'm a chatbot. How can I help you today?",
      transition: { duration: 500 },
      chatDisabled: true,
      path: "choose_agent",
    },
    choose_agent: {
      message: "What kind of agents are you looking for?",
      options: options,
      path: "middle_message",
    },
    middle_message: {
      message: (params) =>
        `Hello I am your ${params.userInput}, ask me anything about the data! <b>(whenever you want to change the agent, type 'change agent'</b>)`,
      path: "llm_response",
    },
    llm_response: {
      message: async (params) => {
        if (params.userInput.toLowerCase() === "change agent") {
          console.log("changing agent");
          params.goToPath("choose_agent");
          return "";
        }
        await handleLLMChat(params);
      },
      path: "llm_response",
    },
  };

  return (
    <div>
      <ChatBot flow={flow} settings={settings} />
    </div>
  );
};

export default ChatBotWidget;
