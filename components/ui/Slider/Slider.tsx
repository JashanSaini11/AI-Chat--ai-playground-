import React from "react";
import { cn } from "@/lib/utils/cn";
import { SliderProps } from "@/types";

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  disabled = false,
  showValue = true,
  className,
  "aria-label": ariaLabel,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
        {showValue && (
          <span className="text-sm font-mono text-foreground font-medium">
            {value}
          </span>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-lg overflow-hidden pointer-events-none">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel || label}
          // aria-valuemin={min}
          // aria-valuemax={max}
          // aria-valuenow={value}
          className={cn(
            "relative w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4",
            "[&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-blue-600",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-all",
            "[&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-webkit-slider-thumb]:active:scale-95",
            "[&::-webkit-slider-thumb]:shadow-md",
            "[&::-webkit-slider-thumb]:relative",
            "[&::-webkit-slider-thumb]:z-10",
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-blue-600",
            "[&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:transition-all",
            "[&::-moz-range-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:active:scale-95",
            "[&::-moz-range-thumb]:shadow-md",

            // Firefox thumb
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-blue-600",
            "[&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:transition-all",
            "[&::-moz-range-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:active:scale-95",
            "[&::-moz-range-thumb]:shadow-md"
          )}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Slider;
