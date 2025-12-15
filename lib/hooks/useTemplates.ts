import { useState, useEffect } from "react";
import { Template, UseTemplatesReturn } from "@/types";
import { mockAPI } from "@/lib/api/mock-api";

/**
 * Custom hook for managing prompt templates
 * Handles loading, saving, deleting, and loading templatesz
 *
 * @param onTemplateLoad - Optional callback when a template is loaded
 */
export function useTemplates(
  onTemplateLoad?: (prompt: string) => void
): UseTemplatesReturn {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  /**
   * Fetch all templates from API
   */
  const fetchTemplates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockAPI.getTemplates();

      if (response.success && response.data) {
        setTemplates(response.data);
      } else {
        setError(response.error || "Failed to fetch templates");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching templates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Save a new template
   */
  const saveTemplate = async (name: string, prompt: string) => {
    if (!name.trim() || !prompt.trim()) {
      throw new Error("Name and prompt are required");
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await mockAPI.saveTemplate(name, prompt);

      if (response.success && response.data) {
        setTemplates((prev) => [...prev, response.data!]);
      } else {
        const errorMsg = response.error || "Failed to save template";
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a template
   */
  const deleteTemplate = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockAPI.deleteTemplate(id);

      if (response.success) {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
      } else {
        const errorMsg = response.error || "Failed to delete template";
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load a template into the prompt editor
   */
  const loadTemplate = (template: Template) => {
    if (onTemplateLoad) {
      onTemplateLoad(template.prompt);
    }
  };

  /**
   * Refresh templates list
   */
  const refreshTemplates = async () => {
    await fetchTemplates();
  };

  return {
    templates,
    isLoading,
    error,
    saveTemplate,
    deleteTemplate,
    loadTemplate,
    refreshTemplates,
  };
}
