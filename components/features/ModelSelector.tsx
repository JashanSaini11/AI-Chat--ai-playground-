"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { Model } from "@/types";
import { mockAPI } from "@/lib/api/mock-api";
import { ChevronDown } from "lucide-react";

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModelId,
  onModelChange,
  className,
}) => {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      const response = await mockAPI.getModels();
      if (response.success && response.data) {
        setModels(response.data);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedModel = models.find((m) => m.id === selectedModelId);

  const handleSelect = (modelId: string) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-2", className)}>
        <label className="text-sm font-medium text-muted-foreground">
          Model Selector
        </label>
        <div className="w-full px-3 py-2 border border-border rounded-lg bg-muted animate-pulse h-10" />
      </div>
    );
  }

  return (
    <div className={cn("relative space-y-2", className)}>
      <label className="text-sm font-medium text-muted-foreground">
        Model Selector
      </label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-3 py-2 text-left border border-border rounded-lg",
            "bg-input-background hover:bg-accent transition-colors",
            "flex items-center justify-between",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            isOpen && "ring-2 ring-ring"
          )}
          aria-label="Select AI model"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex-1 min-w-0">
            <div className="font-medium text-foreground truncate">
              {selectedModel?.name || "Select a model"}
            </div>
            {selectedModel?.description && (
              <div className="text-xs text-muted-foreground mt-0.5 truncate">
                {selectedModel.description}
              </div>
            )}
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-2",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[100]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown */}
            <div
              className={cn(
                "absolute z-[101] w-full mt-1 py-1",
                "bg-popover border border-border rounded-lg shadow-lg",
                "max-h-[300px] overflow-y-auto scrollbar-hide",
                "animate-fadeIn"
              )}
              role="listbox"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {models.map((model) => (
                <button
                  type="button"
                  key={model.id}
                  onClick={() => handleSelect(model.id)}
                  className={cn(
                    "w-full px-3 py-2.5 text-left",
                    "hover:bg-accent transition-colors",
                    "border-b border-border last:border-b-0",
                    selectedModelId === model.id && "bg-accent"
                  )}
                  role="option"
                  aria-selected={selectedModelId === model.id}
                >
                  <div className="font-medium text-foreground">{model.name}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModelSelector;