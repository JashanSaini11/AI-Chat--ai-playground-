"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Slider } from "@/components/ui/Slider/Slider";
import { ModelConfig } from "@/types";
import { ChevronDown } from "lucide-react";

interface ParametersPanelProps {
  config: ModelConfig;
  onChange: (config: ModelConfig) => void;
  className?: string;
}

export const ParametersPanel: React.FC<ParametersPanelProps> = ({
  config,
  onChange,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (key: keyof ModelConfig, value: number) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className={cn("border border-border rounded-lg bg-card", className)}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors rounded-t-lg"
        aria-expanded={isExpanded}
        aria-controls="parameters-content"
      >
        <h3 className="text-lg font-semibold text-card-foreground">
          Model Parameters
        </h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div
          id="parameters-content"
          className="px-4 py-4 space-y-6 border-t border-border animate-fadeIn"
        >
          {/* Temperature */}
          <div>
            <Slider
              label="Temperature"
              value={config.temperature}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) => handleChange("temperature", value)}
              aria-label="Temperature: Controls randomness in responses"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {config.temperature < 0.5 && "More focused and deterministic"}
              {config.temperature >= 0.5 &&
                config.temperature <= 1 &&
                "Balanced creativity"}
              {config.temperature > 1 && "More creative and random"}
            </p>
          </div>

          {/* Max Tokens */}
          <div>
            <Slider
              label="Max Tokens"
              value={config.maxTokens}
              min={256}
              max={4096}
              step={256}
              onChange={(value) => handleChange("maxTokens", value)}
              aria-label="Max Tokens: Maximum length of response"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum length of the generated response
            </p>
          </div>

          {/* Top P */}
          <div>
            <Slider
              label="Top P"
              value={config.topP}
              min={0}
              max={1}
              step={0.01}
              onChange={(value) => handleChange("topP", value)}
              aria-label="Top P: Nucleus sampling parameter"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Controls diversity via nucleus sampling
            </p>
          </div>

          {/* Frequency Penalty */}
          <div>
            <Slider
              label="Frequency Penalty"
              value={config.frequencyPenalty}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) => handleChange("frequencyPenalty", value)}
              aria-label="Frequency Penalty: Reduces repetition"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Reduces likelihood of repeating tokens
            </p>
          </div>

          {/* System Message (Optional) */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              System Message <span className="text-xs">(Optional)</span>
            </label>
            <textarea
              value={config.systemMessage || ""}
              onChange={(e) =>
                onChange({ ...config, systemMessage: e.target.value })
              }
              placeholder="You are a helpful assistant..."
              className={cn(
                "w-full px-3 py-2 rounded-lg",
                "bg-input-background border border-border",
                "text-foreground placeholder-muted-foreground text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "resize-none"
              )}
              rows={3}
              aria-label="System message to guide AI behavior"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Guide the AI&apos;s behavior and personality
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametersPanel;
