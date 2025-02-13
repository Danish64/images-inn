import { toBlob, toJpeg, toPng } from 'html-to-image';
import React, { useState } from 'react';
import CanvasEditor from './CanvasEditor';
import Toolbar from './Toolbar';
import { Element, fontFamilies } from './types';

const ImageEditor: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 1080, height: 1080 });

  const addText = () => {
    const newText: Element = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Double click to edit text',
      position: { x: 100, y: 100 },
      fontSize: 16,
      fontFamily: fontFamilies[0],
      color: '#000000',
    };
    setElements([...elements, newText]);
  };

  const addEmoji = () => {
    const newEmoji: Element = {
      id: `emoji-${Date.now()}`,
      type: 'emoji',
      content: '😊',
      position: { x: 100, y: 100 },
      size: 24,
    };
    setElements([...elements, newEmoji]);
  };

  const addLine = (
    type: 'solid' | 'dashed' = 'solid',
    hasArrow: boolean = false,
  ) => {
    const newLine: Element = {
      id: `line-${Date.now()}`,
      type: 'line',
      lineType: type,
      position: { x: 100, y: 100 },
      width: 100,
      color: '#000000',
      hasArrow,
    };
    setElements([...elements, newLine]);
  };

  const downloadImage = (format: 'png' | 'jpeg' | 'webp') => {
    const canvasElement = document.querySelector(
      '.canvas-container',
    ) as HTMLDivElement;
    if (!canvasElement) return;

    const exportFunction =
      format === 'png' ? toPng : format === 'jpeg' ? toJpeg : toBlob;
    exportFunction(canvasElement)
      .then((data) => {
        let dataUrl = '';
        if (format === 'webp' && data instanceof Blob) {
          dataUrl = URL.createObjectURL(data);
        } else if (typeof data === 'string') {
          dataUrl = data;
        }

        const link = document.createElement('a');
        link.download = `image.${format}`;
        link.href = dataUrl;
        link.click();

        if (format === 'webp') {
          URL.revokeObjectURL(dataUrl);
        }
      })
      .catch((error) => {
        console.error('Failed to generate image:', error);
      });
  };

  return (
    <div className="flex">
      <Toolbar
        addText={addText}
        addEmoji={addEmoji}
        addLine={addLine}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        downloadImage={downloadImage}
        selectedElement={selectedElement}
        setElements={setElements}
        elements={elements}
        setCanvasSize={(width, height) => setCanvasSize({ width, height })}
      />
      <CanvasEditor
        elements={elements}
        setElements={setElements}
        backgroundColor={backgroundColor}
        setSelectedElement={setSelectedElement}
        canvasSize={canvasSize}
      />
    </div>
  );
};

export default ImageEditor;
