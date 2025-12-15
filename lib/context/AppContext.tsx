"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message, ModelConfig } from "@/types";

interface AppContextType {
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
  config: ModelConfig;
  setConfig: (config: ModelConfig) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedModelId, setSelectedModelId] = useState("gpt-3.5");
  const [config, setConfig] = useState<ModelConfig>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    frequencyPenalty: 0,
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [prompt, setPrompt] = useState("");

  const value: AppContextType = {
    selectedModelId,
    setSelectedModelId,
    config,
    setConfig,
    messages,
    setMessages,
    prompt,
    setPrompt,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
