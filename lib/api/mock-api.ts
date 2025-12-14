

import { Message, Template, Model, ModelConfig, ApiResponse } from '@/types';
import modelsData from '@/data/models.json';
import templatesData from '@/data/templates.json';

/**
 * Simulates network delay for realistic API behavior
 */
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * In-memory storage for templates (simulates a database)
 */
let templateStorage: Template[] =(templatesData.templates as unknown as Template[]).map(t => ({
  ...t,
  createdAt: new Date(t.createdAt || new Date()),
  updatedAt: new Date(t.createdAt || new Date())
}));

/**
 * Mock API for AI Playground
 */
export const mockAPI = {
  /**
   * Fetch all available models
   */
  getModels: async (): Promise<ApiResponse<Model[]>> => {
    await delay(300);
    
    try {
      return {
        success: true,
        data: modelsData.models as Model[],
        message: 'Models fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch models',
        message: 'An error occurred while fetching models'
      };
    }
  },

  /**
   * Get a specific model by ID
   */
  getModelById: async (id: string): Promise<ApiResponse<Model>> => {
    await delay(200);
    
    const model = modelsData.models.find(m => m.id === id);
    
    if (!model) {
      return {
        success: false,
        error: 'Model not found',
        message: `No model found with id: ${id}`
      };
    }
    
    return {
      success: true,
      data: model as Model,
      message: 'Model fetched successfully'
    };
  },

  /**
   * Send a message to the AI and get a response
   */
  sendMessage: async (
    prompt: string,
    modelId: string,
    config: ModelConfig
  ): Promise<ApiResponse<string>> => {
    // Simulate longer processing time
    await delay(1500);
    
    try {
      if (!prompt.trim()) {
        return {
          success: false,
          error: 'Empty prompt',
          message: 'Prompt cannot be empty'
        };
      }

      const model = modelsData.models.find(m => m.id === modelId);
      
      if (!model) {
        return {
          success: false,
          error: 'Invalid model',
          message: `Model ${modelId} not found`
        };
      }

      // Generate mock response
      const response = `This is a simulated response from **${model.name}**.

**Your prompt:**
${prompt.slice(0, 200)}${prompt.length > 200 ? '...' : ''}

**Model Configuration:**
• Temperature: ${config.temperature} ${config.temperature > 1 ? '(Creative)' : '(Focused)'}
• Max Tokens: ${config.maxTokens}
• Top P: ${config.topP}
• Frequency Penalty: ${config.frequencyPenalty}

**Analysis:**
Based on your prompt, I would help you with:
1. Understanding the context and requirements
2. Providing relevant information and insights
3. Offering practical solutions or suggestions
4. Explaining concepts in clear, accessible language

${config.temperature > 1.2 ? '🎨 **Creative Mode:** I\'m generating more diverse and imaginative responses!' : '🎯 **Focused Mode:** I\'m providing precise and deterministic responses.'}

*Note: This is a mock response. In production, this would be replaced with actual AI model calls.*`;

      return {
        success: true,
        data: response,
        message: 'Message sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send message',
        message: 'An error occurred while processing your request'
      };
    }
  },

/////////////////////////////////////////////////////////////////////

  /**
   * Fetch all templates
   */
  getTemplates: async (): Promise<ApiResponse<Template[]>> => {
    await delay(400);
    
    try {
      return {
        success: true,
        data: [...templateStorage],
        message: 'Templates fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch templates',
        message: 'An error occurred while fetching templates'
      };
    }
  },

  /**
   * Get a specific template by ID
   */
  getTemplateById: async (id: string): Promise<ApiResponse<Template>> => {
    await delay(200);
    
    const template = templateStorage.find(t => t.id === id);
    
    if (!template) {
      return {
        success: false,
        error: 'Template not found',
        message: `No template found with id: ${id}`
      };
    }
    
    return {
      success: true,
      data: template,
      message: 'Template fetched successfully'
    };
  },

  /**
   * Save a new template
   */
  saveTemplate: async (
    name: string,
    prompt: string,
    description?: string
  ): Promise<ApiResponse<Template>> => {
    await delay(500);
    
    try {
      if (!name.trim()) {
        return {
          success: false,
          error: 'Invalid name',
          message: 'Template name cannot be empty'
        };
      }

      if (!prompt.trim()) {
        return {
          success: false,
          error: 'Invalid prompt',
          message: 'Template prompt cannot be empty'
        };
      }

      // Check for duplicate names
      const existingTemplate = templateStorage.find(
        t => t.name.toLowerCase() === name.toLowerCase()
      );

      if (existingTemplate) {
        return {
          success: false,
          error: 'Duplicate name',
          message: `A template with the name "${name}" already exists`
        };
      }

      const newTemplate: Template = {
        id: Date.now().toString(),
        name: name.trim(),
        prompt: prompt.trim(),
        description: description?.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      templateStorage.push(newTemplate);

      return {
        success: true,
        data: newTemplate,
        message: 'Template saved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save template',
        message: 'An error occurred while saving the template'
      };
    }
  },

  /**
   * Update an existing template
   */
  updateTemplate: async (
    id: string,
    updates: Partial<Omit<Template, 'id' | 'createdAt'>>
  ): Promise<ApiResponse<Template>> => {
    await delay(500);
    
    try {
      const templateIndex = templateStorage.findIndex(t => t.id === id);

      if (templateIndex === -1) {
        return {
          success: false,
          error: 'Template not found',
          message: `No template found with id: ${id}`
        };
      }

      const updatedTemplate: Template = {
        ...templateStorage[templateIndex],
        ...updates,
        updatedAt: new Date()
      };

      templateStorage[templateIndex] = updatedTemplate;

      return {
        success: true,
        data: updatedTemplate,
        message: 'Template updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update template',
        message: 'An error occurred while updating the template'
      };
    }
  },

  /**
   * Delete a template
   */
  deleteTemplate: async (id: string): Promise<ApiResponse<boolean>> => {
    await delay(400);
    
    try {
      const templateIndex = templateStorage.findIndex(t => t.id === id);

      if (templateIndex === -1) {
        return {
          success: false,
          error: 'Template not found',
          message: `No template found with id: ${id}`
        };
      }

      templateStorage.splice(templateIndex, 1);

      return {
        success: true,
        data: true,
        message: 'Template deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete template',
        message: 'An error occurred while deleting the template'
      };
    }
  },

  /**
   * Search templates by name or content
   */
  searchTemplates: async (query: string): Promise<ApiResponse<Template[]>> => {
    await delay(300);
    
    try {
      const lowerQuery = query.toLowerCase();
      const results = templateStorage.filter(
        t => 
          t.name.toLowerCase().includes(lowerQuery) ||
          t.prompt.toLowerCase().includes(lowerQuery) ||
          t.description?.toLowerCase().includes(lowerQuery)
      );

      return {
        success: true,
        data: results,
        message: `Found ${results.length} template(s)`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Search failed',
        message: 'An error occurred while searching templates'
      };
    }
  },

  /**
   * Validate model configuration
   */
  validateConfig: (config: ModelConfig): ApiResponse<boolean> => {
    const errors: string[] = [];

    if (config.temperature < 0 || config.temperature > 2) {
      errors.push('Temperature must be between 0 and 2');
    }

    if (config.maxTokens < 1 || config.maxTokens > 32000) {
      errors.push('Max tokens must be between 1 and 32000');
    }

    if (config.topP < 0 || config.topP > 1) {
      errors.push('Top P must be between 0 and 1');
    }

    if (config.frequencyPenalty < 0 || config.frequencyPenalty > 2) {
      errors.push('Frequency penalty must be between 0 and 2');
    }

    if (errors.length > 0) {
      return {
        success: false,
        error: 'Invalid configuration',
        message: errors.join(', ')
      };
    }

    return {
      success: true,
      data: true,
      message: 'Configuration is valid'
    };
  },

  /**
   * Reset templates to default
   */
  resetTemplates: async (): Promise<ApiResponse<Template[]>> => {
    await delay(500);
    
    try {
      templateStorage = templatesData.templates.map(t => ({
        ...t,
        createdAt: new Date(t.createdAt || new Date()),
        updatedAt: new Date(t.createdAt || new Date())
      }));

      return {
        success: true,
        data: [...templateStorage],
        message: 'Templates reset to default'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to reset templates',
        message: 'An error occurred while resetting templates'
      };
    }
  }
};

export const {
  getModels,
  getModelById,
  sendMessage,
  getTemplates,
  getTemplateById,
  saveTemplate,
  updateTemplate,
  deleteTemplate,
  searchTemplates,
  validateConfig,
  resetTemplates
} = mockAPI;