'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Buttons/Button';
import { Send, Save, Trash2 } from 'lucide-react';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onSaveTemplate: () => void;
  onClear: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  value,
  onChange,
  onSend,
  onSaveTemplate,
  onClear,
  isLoading = false,
  disabled = false,
  placeholder = 'Type your message here... (Shift+Enter for new line)',
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && !disabled && value.trim()) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if (!isLoading && !disabled && value.trim()) {
      onSend();
    }
  };

  const handleSaveTemplate = () => {
    if (value.trim()) {
      onSaveTemplate();
    }
  };

  const characterCount = value.length;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-input-background border border-border',
            'text-foreground placeholder-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            'resize-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors'
          )}
          rows={4}
          aria-label="Prompt editor"
        />
        
        {/* Character counter */}
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {characterCount.toLocaleString()} characters
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={handleSend}
          disabled={isLoading || disabled || !value.trim()}
          loading={isLoading}
          icon={<Send className="w-4 h-4" />}
          variant="primary"
          aria-label="Send message"
        >
          Send
        </Button>

        <Button
          onClick={handleSaveTemplate}
          disabled={disabled || !value.trim()}
          icon={<Save className="w-4 h-4" />}
          variant="secondary"
          aria-label="Save as template"
        >
          Save Template
        </Button>

        <Button
          onClick={onClear}
          disabled={disabled}
          icon={<Trash2 className="w-4 h-4" />}
          variant="ghost"
          aria-label="Clear editor"
        >
          Clear
        </Button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">Enter</kbd> to send, 
        <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs ml-1">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
};

export default PromptEditor;