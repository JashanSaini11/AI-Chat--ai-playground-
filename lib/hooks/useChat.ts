

import { useState, useCallback } from 'react';
import { Message, ModelConfig, UseChatReturn } from '@/types';
import { mockAPI } from '@/lib/api/mock-api';

/**
 * Custom hook for managing chat messages and AI interactions
 * 
 * @param modelId - The AI model to use
 * @param config - Model configuration parameters
 */ 
export function useChat(
  modelId: string,
  config: ModelConfig
): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Send a message to the AI
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        setError('Message cannot be empty');
        return;
      }

      setIsLoading(true);
      setError(null);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      try {
        // Send to AI
        const response = await mockAPI.sendMessage(content, modelId, config);

        if (response.success && response.data) {
          // Add AI response
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.data,
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, assistantMessage]);
        } else {
          const errorMsg = response.error || 'Failed to get response';
          setError(errorMsg);
          
          // Add error message to chat
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Error: ${errorMsg}`,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMsg);
        console.error('Error sending message:', err);

        // Add error message to chat
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Error: ${errorMsg}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [modelId, config]
  );

  /**
   * Clear all messages except the initial greeting
   */
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  /**
   * Regenerate the last AI response
   */
  const regenerateLastMessage = useCallback(async () => {
    // Find the last user message
    const lastUserMessageIndex = messages
      .map((m, i) => (m.role === 'user' ? i : -1))
      .filter(i => i !== -1)
      .pop();

    if (lastUserMessageIndex === undefined) {
      setError('No user message to regenerate');
      return;
    }

    const lastUserMessage = messages[lastUserMessageIndex];

    // Remove all messages after the last user message
    setMessages(prev => prev.slice(0, lastUserMessageIndex + 1));

    // Resend the message
    await sendMessage(lastUserMessage.content);
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    regenerateLastMessage,
  };
}