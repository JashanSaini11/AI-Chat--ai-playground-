
/**
 * Message in the chat
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

/**
 * Prompt template
 */
export interface Template {
  id: string;
  name: string;
  prompt: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * AI Model configuration
 */
export interface Model {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  contextWindow: number;
  provider?: 'openai' | 'anthropic' | 'custom';
}

/**
 * Model parameters for generation
 */
export interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty?: number;
  systemMessage?: string;
}

/**
 * Chat session state
 */
export interface ChatSession {
  id: string;
  modelId: string;
  messages: Message[];
  config: ModelConfig;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

/**
 * Error state
 */
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

/**
 * Theme types
 */
export type Theme = 'light' | 'dark';

/**
 * Component props types
 */
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  'aria-label'?: string;
}

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
  'aria-label'?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface ChatBubbleProps {
  message: Message;
  onCopy?: (content: string) => void;
  className?: string;
}

/**
 * Hook return types
 */
export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  regenerateLastMessage: () => Promise<void>;
}

export interface UseTemplatesReturn {
  templates: Template[];
  isLoading: boolean;
  error: string | null;
  saveTemplate: (name: string, prompt: string) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  loadTemplate: (template: Template) => void;
  refreshTemplates: () => Promise<void>;
}

export interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}