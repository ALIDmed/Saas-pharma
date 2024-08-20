import { AnalysisContext } from "@/pages/Analysis";
import React, { useContext } from "react";
import ChatBot from "react-chatbotify";

const ChatBotWidget = () => {

  const {chartData}= useContext(AnalysisContext)
  console.log("chartData", chartData);
  const flow = {
    start: {
      message: "Hello, please choose the agent type you want to chat with",
      options: ["Market Research", "Data Analyst"],
      chatDisabled: true,
      path: "model_loop",
    },
    model_loop: {
      message: (params) => {
        return `you choose ${params.userInput} for the option ${params.option}`;
      },
      path: "model_loop",
    },
  };

  return (
    <div>
      <ChatBot flow={flow} />
    </div>
  );
};

export default ChatBotWidget;
