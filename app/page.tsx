// app/page.tsx

'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatArea } from '@/components/features/ChatArea';
import { PromptEditor } from '@/components/features/PromptEditor';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Buttons/Button';
import { useThemeContext } from '@/components/providers/ThemeProvider';
import { useTemplates } from '@/lib/hooks/useTemplates';
import { useChat } from '@/lib/hooks/useChat';
import { ModelConfig } from '@/types';

export default function HomePage() {
  // Theme
  const { theme, toggleTheme } = useThemeContext();

  // Model and Config
  const [selectedModelId, setSelectedModelId] = useState('gpt-3.5');
  const [config, setConfig] = useState<ModelConfig>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    frequencyPenalty: 0,
  });

  // Prompt
  const [prompt, setPrompt] = useState('');

  // Chat
  const { messages, isLoading, sendMessage, clearMessages } = useChat(
    selectedModelId,
    config
  );

  // Start with empty messages for better empty state
  const displayMessages = messages.filter(m => m.id !== '1'); // Remove default greeting

  // Templates
  const {
    templates,
    isLoading: templatesLoading,
    saveTemplate,
    deleteTemplate,
    loadTemplate,
  } = useTemplates((templatePrompt) => {
    setPrompt(templatePrompt);
  });

  // Save Template Modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [saveError, setSaveError] = useState('');

  // Handle sending message
  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return;

    await sendMessage(prompt);
    setPrompt('');
  };

  // Handle save template
  const handleSaveTemplate = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt first');
      return;
    }
    setIsSaveModalOpen(true);
    setTemplateName('');
    setSaveError('');
  };

  const confirmSaveTemplate = async () => {
    if (!templateName.trim()) {
      setSaveError('Template name is required');
      return;
    }

    try {
      await saveTemplate(templateName, prompt);
      setIsSaveModalOpen(false);
      setTemplateName('');
      setSaveError('');
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save template');
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template: any) => {
    loadTemplate(template);
  };

  // Handle template deletion
  const handleTemplateDelete = async (id: string) => {
    try {
      await deleteTemplate(id);
    } catch (error) {
      console.error('Failed to delete template:', error);
      alert('Failed to delete template');
    }
  };

  // Get model name for header
  const getModelName = () => {
    const modelNames: Record<string, string> = {
      'gpt-3.5': 'GPT-3.5',
      'gpt-4': 'GPT-4',
      'claude-3-sonnet': 'Claude 3 Sonnet',
      'claude-3-opus': 'Claude 3 Opus',
      'custom-model': 'Custom Model',
    };
    return modelNames[selectedModelId] || selectedModelId;
  };

  return (
    <>
      <MainLayout
        selectedModelId={selectedModelId}
        modelName={getModelName()}
        onModelChange={setSelectedModelId}
        config={config}
        onConfigChange={setConfig}
        templates={templates}
        onTemplateSelect={handleTemplateSelect}
        onTemplateDelete={handleTemplateDelete}
        theme={theme}
        onThemeToggle={toggleTheme}
      >
        <div className="flex flex-col h-full">
          {/* Chat Area - Takes most of the space */}
          <div className="flex-1 overflow-hidden">
            <ChatArea
              messages={displayMessages}
              isLoading={isLoading}
              onClear={clearMessages}
            />
          </div>

          {/* Prompt Editor - Fixed at bottom */}
          <div className="border-t border-border bg-card px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <PromptEditor
                value={prompt}
                onChange={setPrompt}
                onSend={handleSend}
                onSaveTemplate={handleSaveTemplate}
                onClear={() => setPrompt('')}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </MainLayout>

      {/* Save Template Modal */}
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => {
          setIsSaveModalOpen(false);
          setTemplateName('');
          setSaveError('');
        }}
        title="Save Prompt Template"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsSaveModalOpen(false);
                setTemplateName('');
                setSaveError('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSaveTemplate}
              disabled={!templateName.trim()}
            >
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
                setSaveError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && templateName.trim()) {
                  confirmSaveTemplate();
                }
              }}
              placeholder="e.g., Code Review Assistant"
              className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            {saveError && (
              <p className="text-sm text-destructive mt-2">{saveError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Prompt Preview
            </label>
            <div className="px-3 py-2 bg-muted rounded-lg text-sm text-muted-foreground max-h-32 overflow-y-auto">
              {prompt || 'No prompt entered'}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Give your template a descriptive name so you can easily find it later.
          </p>
        </div>
      </Modal>
    </>
  );
}