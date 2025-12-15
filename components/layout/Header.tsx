"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { Menu, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Buttons/Button";

interface HeaderProps {
  modelName?: string;
  onMenuClick?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  modelName,
  onMenuClick,
  className,
}) => {
  return (
    <header
      className={cn(
        "h-16 border-b border-border px-4 lg:px-6",
        "flex items-center justify-between bg-card",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <div>
            <h1 className="font-medium text-card-foreground">AI Playground</h1>
            {modelName && (
              <p className="text-xs text-muted-foreground">
                Model: {modelName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<HelpCircle className="w-5 h-5" />}
          aria-label="Help"
        >
          <span className="sr-only">Help</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
