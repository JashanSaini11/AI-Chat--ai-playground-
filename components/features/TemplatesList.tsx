
'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Template } from '@/types';
import { Save, Trash2, FileText } from 'lucide-react';
import { truncate } from '@/lib/utils/format';

interface TemplatesListProps {
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
  onTemplateDelete?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  onTemplateSelect,
  onTemplateDelete,
  isLoading = false,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Templates</h4>
          <Save className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-md bg-muted animate-pulse h-12"
            />
          ))}
        </div>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Templates</h4>
          <Save className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="px-3 py-6 text-center border border-dashed border-border rounded-lg">
          <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No templates yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Save your prompts to reuse them later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-muted-foreground">Templates</h4>
        <Save className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              'group relative px-3 py-2 rounded-md',
              'hover:bg-sidebar-accent transition-colors',
              'cursor-pointer'
            )}
          >
            <button
              onClick={() => onTemplateSelect(template)}
              className="w-full text-left"
              aria-label={`Load template: ${template.name}`}
            >
              <div className="font-medium text-sm text-sidebar-foreground pr-8">
                {template.name}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {truncate(template.prompt, 60)}
              </div>
            </button>

            {/* Delete button */}
            {onTemplateDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete template "${template.name}"?`)) {
                    onTemplateDelete(template.id);
                  }
                }}
                className={cn(
                  'absolute top-2 right-2',
                  'p-1 rounded hover:bg-destructive/10',
                  'opacity-0 group-hover:opacity-100 transition-opacity'
                )}
                aria-label={`Delete template: ${template.name}`}
              >
                <Trash2 className="w-3 h-3 text-destructive" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesList;