import {
  DoAndDontTemplate,
  DoAndDontTemplateForm,
} from './components/DoAndDontTemplate';

const FormPanel = () => {
  const handleSubmit = (data: DoAndDontTemplate) => {
    console.log('Form submitted with data:', data);
  };
  return (
    <div className="flex w-full flex-col">
      <DoAndDontTemplateForm onSubmit={handleSubmit} />
    </div>
  );
};

export default FormPanel;
