// components/ui/Modal.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Buttons/Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper components for each story
const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
      >
        <p>This is a basic modal with some content.</p>
      </Modal>
    </>
  );
};

const WithFooterExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal with Footer"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <p>This modal has a footer with action buttons.</p>
      </Modal>
    </>
  );
};

const SaveTemplateExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleSave = () => {
    alert(`Template "${templateName}" saved!`);
    setIsOpen(false);
    setTemplateName('');
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Save Template</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Save Prompt Template"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsOpen(false);
                setTemplateName('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!templateName.trim()}>
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Give your template a descriptive name so you can easily find it
            later.
          </p>
        </div>
      </Modal>
    </>
  );
};

const SmallSizeExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Small Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Small Modal"
        size="sm"
      >
        <p>This is a small modal.</p>
      </Modal>
    </>
  );
};

const LargeSizeExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Large Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Large Modal"
        size="lg"
      >
        <div className="space-y-4">
          <p>This is a large modal with more content.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </Modal>
    </>
  );
};

const LongContentExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Scrollable Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal with Long Content"
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              This is paragraph {i + 1}. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
};

export const Basic: Story = {
  render: () => <BasicExample />,
};

export const WithFooter: Story = {
  render: () => <WithFooterExample />,
};

export const SaveTemplate: Story = {
  render: () => <SaveTemplateExample />,
};

export const SmallSize: Story = {
  render: () => <SmallSizeExample />,
};

export const LargeSize: Story = {
  render: () => <LargeSizeExample />,
};

export const LongContent: Story = {
  render: () => <LongContentExample />,
};