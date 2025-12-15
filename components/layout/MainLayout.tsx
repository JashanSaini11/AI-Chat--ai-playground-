"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ModelConfig, Template } from "@/types";

interface MainLayoutProps {
  children: React.ReactNode;
  selectedModelId: string;
  modelName?: string;
  onModelChange: (modelId: string) => void;
  config: ModelConfig;
  onConfigChange: (config: ModelConfig) => void;
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
  onTemplateDelete?: (id: string) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  selectedModelId,
  modelName,
  onModelChange,
  config,
  onConfigChange,
  templates,
  onTemplateSelect,
  onTemplateDelete,
  theme,
  onThemeToggle,
  className,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={cn("flex h-screen overflow-hidden", className)}>
      {/* Sidebar */}
      <Sidebar
        selectedModelId={selectedModelId}
        onModelChange={onModelChange}
        config={config}
        onConfigChange={onConfigChange}
        templates={templates}
        onTemplateSelect={onTemplateSelect}
        onTemplateDelete={onTemplateDelete}
        theme={theme}
        onThemeToggle={onThemeToggle}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          modelName={modelName}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
