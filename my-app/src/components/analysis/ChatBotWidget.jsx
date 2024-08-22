import { AnalysisContext } from "@/pages/Analysis";
import { useContext, useEffect, useState } from "react";
import ChatBot from "react-chatbotify";

const ChatBotWidget = () => {
  const { chartData } = useContext(AnalysisContext);
  const options = ["Data Analyst", "Market Researcher", "Ai Assistant"];
  const [role, setRole] = useState("");

  const handleLLMChat = async (params) => {
    try {
      const filteredChatHistory = JSON.parse(
        localStorage.getItem("rcb-history")
      ).filter((chat) => chat.type === "string");

      localStorage.setItem("rcb-history", JSON.stringify(filteredChatHistory));

      const response = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: params.userInput,
          data: chartData,
          chatHistory: JSON.parse(localStorage.getItem("rcb-history")),
          role: role,
        }),
      });

      console.log("response");

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
      primaryColor: "#4770e8",
      secondaryColor: "#4770e8",
      showHeader: true,
      showFooter: false,
    },
    header: {
      title: (
        <div
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Inter",
          }}
        >
          AI Assisstant
        </div>
      ),
      showAvatar: false,
    },
    tooltip: {
      mode: "",
      text: "",
    },
    notification: {
      disabled: true,
      defaultToggledOn: true,
      volume: 0.2,
      showCount: true,
    },
    chatInput: {
      allowNewline: true,
      disabledPlaceholderText: "Wait for the bot to finish...",
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
      chatDisabled: true,
    },
    middle_message: {
      message: (params) =>
        `Hello I am your ${params.userInput}, ask me anything about the data! <b>(whenever you want to change the agent, type 'change agent'</b>)`,
      path: "llm_response",
      function: (params) => {
        setRole(params.userInput);
      },
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
    <div className="z-[99999]">
      <ChatBot flow={flow} settings={settings} />
    </div>
  );
};

export default ChatBotWidget;
