import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Element } from './types';

interface CanvasEditorProps {
  elements: Element[];
  setElements: (elements: Element[]) => void;
  backgroundColor: string;
  setSelectedElement: (element: Element | null) => void;
  canvasSize: { width: number; height: number };
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
  elements,
  setElements,
  backgroundColor,
  setSelectedElement,
  canvasSize,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrag = (id: string, data: { x: number; y: number }) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, position: { x: data.x, y: data.y } } : el,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  return (
    <div
      ref={canvasRef}
      className="canvas-container relative"
      style={{
        backgroundColor,
        width: canvasSize.width,
        height: canvasSize.height,
      }}
    >
      {elements.map((element) => (
        <Draggable
          key={element.id}
          defaultPosition={element.position}
          onDrag={(e, data) => handleDrag(element.id, data)}
          onStop={() => setSelectedElement(element)}
        >
          <div
            style={{
              fontSize: element.fontSize,
              fontFamily: element.fontFamily,
              color: element.color,
              cursor: 'move',
              position: 'absolute',
            }}
            onClick={() => setSelectedElement(element)}
          >
            {element.type === 'text' ? (
              <div>
                {element.content}
                <button
                  onClick={() => handleDelete(element.id)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </div>
            ) : element.type === 'emoji' ? (
              <span style={{ fontSize: element.size }}>{element.content}</span>
            ) : element.type === 'line' ? (
              <div
                style={{
                  width: element.width,
                  borderTop: `2px ${element.lineType} ${element.color}`,
                  position: 'relative',
                }}
              >
                {element.hasArrow && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderBottom: `16px solid ${element.color}`,
                    }}
                  />
                )}
                <button
                  onClick={() => handleDelete(element.id)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default CanvasEditor;
