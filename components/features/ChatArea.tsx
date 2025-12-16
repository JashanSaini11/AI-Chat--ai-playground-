'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChatBubble } from '@/components/ui/ChatBubble/ChatBubble';
import { Button } from '@/components/ui/Buttons/Button';
import { Message } from '@/types';
import { Download, Trash2, Copy } from 'lucide-react';
import { copyToClipboard, downloadJSON } from '@/lib/utils/format';

interface ChatAreaProps {
  messages: Message[];
  isLoading?: boolean;
  onClear?: () => void;
  className?: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading = false,
  onClear,
  className,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = async (content: string) => {
    try {
      await copyToClipboard(content);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadJSON = () => {
    downloadJSON(messages, `chat-${Date.now()}`);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <h2 className="text-lg font-semibold text-card-foreground">Chat</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={handleDownloadJSON}
            aria-label="Download chat as JSON"
          >
            Export
          </Button>
          {onClear && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={onClear}
              aria-label="Clear chat"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-background">
        {messages.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl px-4">
       
              <div className="mb-8 inline-block animate-fadeIn">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl font-bold">AI</span>
                </div>
              </div>

            
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                Welcome to AI Playground
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Your interactive space to experiment with AI models
              </p>

              {/* Feature Cards */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Multiple AI Models</h3>
                      <p className="text-sm text-muted-foreground">Choose from GPT-3.5, GPT-4, Claude, and custom models</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Fine-tune Parameters</h3>
                      <p className="text-sm text-muted-foreground">Adjust temperature, tokens, and more for perfect results</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Save Templates</h3>
                      <p className="text-sm text-muted-foreground">Store your favorite prompts for quick reuse</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Export Chats</h3>
                      <p className="text-sm text-muted-foreground">Download your conversations as JSON</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="hidden md:block space-y-2 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button className="px-4 py-2 rounded-full bg-muted hover:bg-accent text-sm transition-colors">
                    Explain quantum computing
                  </button>
                  <button className="px-4 py-2 rounded-full bg-muted hover:bg-accent text-sm transition-colors">
                    Write a Python function
                  </button>
                  <button className="px-4 py-2 rounded-full bg-muted hover:bg-accent text-sm transition-colors">
                    Brainstorm app ideas
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                onCopy={handleCopy}
              />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="max-w-[70%]">
                  <div className="px-4 py-3 rounded-lg bg-muted rounded-bl-none">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;