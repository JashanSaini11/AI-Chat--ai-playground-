"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { ModelSelector } from "@/components/features/ModelSelector";
import { TemplatesList } from "@/components/features/TemplatesList";
import { Slider } from "@/components/ui/Slider/Slider";
import { Button } from "@/components/ui/Buttons/Button";
import { ModelConfig, Template } from "@/types";
import { Sun, Moon, X } from "lucide-react";

interface SidebarProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
  config: ModelConfig;
  onConfigChange: (config: ModelConfig) => void;
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
  onTemplateDelete?: (id: string) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedModelId,
  onModelChange,
  config,
  onConfigChange,
  templates,
  onTemplateSelect,
  onTemplateDelete,
  theme,
  onThemeToggle,
  isOpen = true,
  onClose,
  className,
}) => {
  const handleConfigChange = (key: keyof ModelConfig, value: number) => {
    onConfigChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-[280px] bg-sidebar border-r border-sidebar-border",
          "flex flex-col h-screen",
          "transition-transform duration-300 ease-in-out",
          !isOpen && "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <h2 className="font-medium text-sidebar-foreground">Settings</h2>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-sidebar-accent rounded"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Model Selector */}
          <ModelSelector
            selectedModelId={selectedModelId}
            onModelChange={onModelChange}
          />

          {/* Parameters */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Parameters
            </h3>

            <Slider
              label="Temperature"
              value={config.temperature}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) => handleConfigChange("temperature", value)}
            />

            <Slider
              label="Max Tokens"
              value={config.maxTokens}
              min={256}
              max={4096}
              step={256}
              onChange={(value) => handleConfigChange("maxTokens", value)}
            />
          </div>

          {/* Templates */}
          <TemplatesList
            templates={templates}
            onTemplateSelect={onTemplateSelect}
            onTemplateDelete={onTemplateDelete}
          />
        </div>

        {/* Footer - Theme Toggle */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={onThemeToggle}
            icon={
              theme === "light" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )
            }
            className="w-full justify-start"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
