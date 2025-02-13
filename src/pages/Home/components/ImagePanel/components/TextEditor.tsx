// src/components/TextEditor.tsx
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select } from '@radix-ui/react-select';
import React from 'react';
import { fontFamilies } from './types';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  color: string;
  setColor: (color: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  text,
  setText,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  color,
  setColor,
}) => {
  return (
    <div className="space-y-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <Select
        value={fontFamily}
        onValueChange={(value) => setFontFamily(value)}
      >
        {fontFamilies.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </Select>
      <Slider
        value={[fontSize]}
        onValueChange={(value) => setFontSize(value[0])}
        min={10}
        max={100}
      />
      <label className="mb-2 block text-sm font-medium">Background Color</label>
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="my-2 w-full"
      />
    </div>
  );
};

export default TextEditor;
