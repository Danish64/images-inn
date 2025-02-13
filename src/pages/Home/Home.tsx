import ImagePanel from './components/ImagePanel/ImagePanel';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-stone-50 p-12 pt-24">
      <h1 className="mb-4 text-4xl font-bold">Images Inn</h1>
      <p className="text-xl">Create image content quickly</p>
      <div className="mt-16 flex w-full justify-between border-deep-gray px-48">
        {/* <FormPanel /> */}
        <ImagePanel />
      </div>
    </div>
  );
};

export default Home;
