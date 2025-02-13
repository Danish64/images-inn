export interface Element {
  id: string;
  type: 'text' | 'emoji' | 'line';
  content?: string;
  position: { x: number; y: number };
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  size?: number;
  lineType?: 'solid' | 'dashed';
  width?: number;
  hasArrow?: boolean;
}

export const fontFamilies = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Georgia',
  'Courier New',
];
