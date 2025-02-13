import { DynamicForm } from './DynamicForm';

export function TodoForm() {
  const fields = [
    {
      name: 'title',
      label: 'Todo Title',
      type: 'text' as const,
      required: true,
    },
    { name: 'description', label: 'Description', type: 'textarea' as const },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select' as const,
      options: ['Low', 'Medium', 'High'],
    },
    { name: 'completed', label: 'Completed', type: 'checkbox' as const },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Todo data:', data);
    // Here you would typically save the todo item
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Create a New Todo</h2>
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Add Todo"
        // className="[&_button:hover]:bg-gray-200 [&_button]:bg-white [&_button]:text-black [&_input]:bg-gray-800 [&_input]:text-white [&_textarea]:bg-gray-800 [&_textarea]:text-white"
      />
    </div>
  );
}
