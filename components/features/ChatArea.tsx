// components/features/ChatArea.tsx

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
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AI</span>
              </div>
              <p className="text-muted-foreground">Start a conversation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Type a message below to begin
              </p>
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