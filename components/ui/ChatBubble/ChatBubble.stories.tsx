
import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';
import { Message } from '@/types';

const meta: Meta<typeof ChatBubble> = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

const userMessage: Message = {
  id: '1',
  role: 'user',
  content: 'Hello! Can you help me with a coding problem?',
  timestamp: new Date(),
};

const assistantMessage: Message = {
  id: '2',
  role: 'assistant',
  content:
    "Of course! I'd be happy to help you with your coding problem. Please share the details of what you're working on, including any error messages or specific issues you're encountering.",
  timestamp: new Date(),
};

const longMessage: Message = {
  id: '3',
  role: 'assistant',
  content: `Here's a detailed explanation of the concept:

1. First, you need to understand the basics
2. Then, apply the following principles:
   - Principle A: This is important
   - Principle B: This is also crucial
3. Finally, test your implementation

This approach will help you solve the problem effectively. Let me know if you have any questions!`,
  timestamp: new Date(),
};

export const UserMessage: Story = {
  args: {
    message: userMessage,
  },
};

export const AssistantMessage: Story = {
  args: {
    message: assistantMessage,
    onCopy: (content) => console.log('Copied:', content),
  },
};

export const LongMessage: Story = {
  args: {
    message: longMessage,
    onCopy: (content) => console.log('Copied:', content),
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="max-w-4xl space-y-4 bg-background p-6 rounded-lg">
      <ChatBubble
        message={{
          id: '1',
          role: 'assistant',
          content: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date(Date.now() - 60000),
        }}
      />
      <ChatBubble
        message={{
          id: '2',
          role: 'user',
          content: 'I need help understanding React hooks.',
          timestamp: new Date(Date.now() - 45000),
        }}
      />
      <ChatBubble
        message={{
          id: '3',
          role: 'assistant',
          content:
            "React Hooks are functions that let you use state and other React features in functional components. The most common hooks are:\n\n1. useState - For managing state\n2. useEffect - For side effects\n3. useContext - For consuming context\n\nWould you like me to explain any of these in more detail?",
          timestamp: new Date(Date.now() - 30000),
        }}
        onCopy={(content) => console.log('Copied:', content)}
      />
      <ChatBubble
        message={{
          id: '4',
          role: 'user',
          content: 'Yes, please explain useState!',
          timestamp: new Date(Date.now() - 15000),
        }}
      />
      <ChatBubble
        message={{
          id: '5',
          role: 'assistant',
          content:
            'useState is a Hook that lets you add state to functional components. Here\'s how it works:\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\n- `count` is the current state value\n- `setCount` is the function to update it\n- `0` is the initial value\n\nWhen you call setCount, React re-renders the component with the new value!',
          timestamp: new Date(),
        }}
        onCopy={(content) => console.log('Copied:', content)}
      />
    </div>
  ),
};

export const WithCodeBlock: Story = {
  args: {
    message: {
      id: '1',
      role: 'assistant',
      content: `Here's an example of how to use the Button component:

\`\`\`typescript
import { Button } from '@/components/ui/Button';

function MyComponent() {
  return (
    <Button variant="primary" onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  );
}
\`\`\`

This will render a primary button with a click handler.`,
      timestamp: new Date(),
    },
    onCopy: (content) => console.log('Copied:', content),
  },
};