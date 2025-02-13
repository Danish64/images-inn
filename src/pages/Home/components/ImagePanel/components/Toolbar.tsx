import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import React from 'react';
import { Element, fontFamilies } from './types';

interface ToolbarProps {
  addText: () => void;
  addEmoji: () => void;
  addLine: (type: 'solid' | 'dashed', hasArrow?: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  downloadImage: (format: 'png' | 'jpeg' | 'webp') => void;
  selectedElement: Element | null;
  setSelectedElement: (element: Element | null) => void;
  setElements: (elements: Element[]) => void;
  elements: Element[];
  setCanvasSize: (width: number, height: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  addText,
  addEmoji,
  addLine,
  backgroundColor,
  setBackgroundColor,
  downloadImage,
  selectedElement,
  setSelectedElement,
  setElements,
  elements,
  setCanvasSize,
}) => {
  const handleTextEdit = (id: string, newContent: string) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, content: newContent } : el,
      ),
    );
  };

  const handleFontFamilyChange = (id: string, fontFamily: string) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, fontFamily } : el)),
    );
  };

  const handleFontSizeChange = (id: string, fontSize: number) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, fontSize } : el)),
    );
  };

  const handleColorChange = (id: string, color: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, color } : el)));
  };

  const handleDelete = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    setSelectedElement(null);
  };

  return (
    <div className="w-64 border-r bg-gray-100 p-4">
      <div className="mb-4 flex">
        <Button
          onClick={() => setCanvasSize(1080, 1080)}
          className="flex-1 rounded-l border-black bg-white p-2 hover:bg-gray-200"
        >
          Square
        </Button>
        <Button
          onClick={() => setCanvasSize(1200, 626)}
          className="flex-1 border-black bg-white p-2 hover:bg-gray-200"
        >
          Landscape
        </Button>
        <Button
          onClick={() => setCanvasSize(1920, 1080)}
          className="flex-1 rounded-r border-black bg-white p-2 hover:bg-gray-200"
        >
          Portrait
        </Button>
      </div>

      <Button
        onClick={addText}
        className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
      >
        Add Text
      </Button>
      <Button
        onClick={addEmoji}
        className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
      >
        Add Emoji
      </Button>
      <Button
        onClick={() => addLine('solid')}
        className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
      >
        Add Solid Line
      </Button>
      <Button
        onClick={() => addLine('dashed')}
        className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
      >
        Add Dashed Line
      </Button>
      <Button
        onClick={() => addLine('solid', true)}
        className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
      >
        Add Arrow
      </Button>

      <label className="mb-2 block text-sm font-medium">Background Color</label>
      <Input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="my-2 w-full"
      />

      <div className="mt-4">
        <Button
          onClick={() => downloadImage('png')}
          className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
        >
          Download PNG
        </Button>
        <Button
          onClick={() => downloadImage('jpeg')}
          className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
        >
          Download JPEG
        </Button>
        <Button
          onClick={() => downloadImage('webp')}
          className="my-2 w-full rounded border-black bg-white p-2 hover:bg-gray-200"
        >
          Download WebP
        </Button>
      </div>

      {selectedElement && (
        <div className="mt-4">
          <Button
            onClick={() => handleDelete(selectedElement.id)}
            className="my-2 w-full rounded border-black bg-red-500 p-2 text-white hover:bg-red-700"
          >
            Delete Element
          </Button>
        </div>
      )}

      {selectedElement && selectedElement.type === 'text' && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Text Editor</h3>
          <Input
            value={selectedElement.content || ''}
            onChange={(e) => handleTextEdit(selectedElement.id, e.target.value)}
            placeholder="Enter text"
            className="my-2 w-full"
          />
          <select
            value={selectedElement.fontFamily || fontFamilies[0]}
            onChange={(e) =>
              handleFontFamilyChange(selectedElement.id, e.target.value)
            }
            className="my-2 w-full"
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <Slider
            value={[selectedElement.fontSize || 16]}
            onValueChange={(value) =>
              handleFontSizeChange(selectedElement.id, value[0])
            }
            min={10}
            max={100}
            className="my-2 w-full"
          />
          <label className="mb-2 block text-sm font-medium">Text Color</label>
          <Input
            type="color"
            value={selectedElement.color || '#000000'}
            onChange={(e) =>
              handleColorChange(selectedElement.id, e.target.value)
            }
            className="my-2 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Toolbar;
