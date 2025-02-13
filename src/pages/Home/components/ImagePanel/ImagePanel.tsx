import ImageEditor from './components/ImageEditor';

const ImagePanel = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="ml-8 h-full w-full">
        <ImageEditor />
      </div>
    </div>
  );
};

export default ImagePanel;
