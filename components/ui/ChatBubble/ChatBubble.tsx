
import React from 'react';
import { cn } from '@/lib/utils/cn';
import { ChatBubbleProps } from '@/types';
import { Copy, Check } from 'lucide-react';
import { formatTime } from '@/lib/utils/format';

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  onCopy,
  className,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (onCopy) {
      onCopy(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex gap-3 animate-fadeIn',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {/* Avatar - AI */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      )}

      {/* Message Container */}
      <div className={cn('max-w-[70%]', isUser && 'order-1')}>
        {/* Timestamp */}
        <div
          className={cn(
            'flex items-center gap-2 mb-1',
            isUser ? 'justify-end' : 'justify-start'
          )}
        >
          <span className="text-xs text-muted-foreground">
            {message.role === 'user' ? 'You' : 'AI'} •{' '}
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            'px-4 py-3 rounded-lg transition-all',
            isUser &&
              'bg-blue-600 text-white rounded-br-none shadow-md hover:shadow-lg',
            isAssistant &&
              'bg-muted text-foreground rounded-bl-none shadow-sm hover:shadow-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Copy Button - Only for AI messages */}
        {isAssistant && (
          <button
            onClick={handleCopy}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            aria-label="Copy message"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Avatar - User */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;