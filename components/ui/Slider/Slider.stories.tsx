// components/ui/Slider.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Wrapper component for Temperature story
const TemperatureExample = () => {
  const [value, setValue] = useState(0.7);
  return (
    <div className="w-80">
      <Slider
        label="Temperature"
        value={value}
        min={0}
        max={2}
        step={0.1}
        onChange={setValue}
      />
    </div>
  );
};

// Wrapper component for MaxTokens story
const MaxTokensExample = () => {
  const [value, setValue] = useState(2048);
  return (
    <div className="w-80">
      <Slider
        label="Max Tokens"
        value={value}
        min={256}
        max={4096}
        step={256}
        onChange={setValue}
      />
    </div>
  );
};

// Wrapper component for TopP story
const TopPExample = () => {
  const [value, setValue] = useState(1.0);
  return (
    <div className="w-80">
      <Slider
        label="Top P"
        value={value}
        min={0}
        max={1}
        step={0.01}
        onChange={setValue}
      />
    </div>
  );
};

// Wrapper component for Disabled story
const DisabledExample = () => {
  const [value, setValue] = useState(0.7);
  return (
    <div className="w-80">
      <Slider
        label="Temperature (Disabled)"
        value={value}
        min={0}
        max={2}
        step={0.1}
        onChange={setValue}
        disabled
      />
    </div>
  );
};

// Wrapper component for WithoutValue story
const WithoutValueExample = () => {
  const [value, setValue] = useState(0.5);
  return (
    <div className="w-80">
      <Slider
        label="Opacity"
        value={value}
        min={0}
        max={1}
        step={0.01}
        onChange={setValue}
        showValue={false}
      />
    </div>
  );
};

// Wrapper component for AllParameters story
const AllParametersExample = () => {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(1.0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);

  return (
    <div className="w-96 space-y-6 p-6 bg-card rounded-lg">
      <h3 className="text-lg font-semibold">Model Parameters</h3>
      <Slider
        label="Temperature"
        value={temperature}
        min={0}
        max={2}
        step={0.1}
        onChange={setTemperature}
      />
      <Slider
        label="Max Tokens"
        value={maxTokens}
        min={256}
        max={4096}
        step={256}
        onChange={setMaxTokens}
      />
      <Slider
        label="Top P"
        value={topP}
        min={0}
        max={1}
        step={0.01}
        onChange={setTopP}
      />
      <Slider
        label="Frequency Penalty"
        value={frequencyPenalty}
        min={0}
        max={2}
        step={0.1}
        onChange={setFrequencyPenalty}
      />
    </div>
  );
};

export const Temperature: Story = {
  render: () => <TemperatureExample />,
};

export const MaxTokens: Story = {
  render: () => <MaxTokensExample />,
};

export const TopP: Story = {
  render: () => <TopPExample />,
};

export const Disabled: Story = {
  render: () => <DisabledExample />,
};

export const WithoutValue: Story = {
  render: () => <WithoutValueExample />,
};

export const AllParameters: Story = {
  render: () => <AllParametersExample />,
};