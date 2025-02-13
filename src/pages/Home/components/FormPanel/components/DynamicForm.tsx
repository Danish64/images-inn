import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'checkbox' | 'select';
  options?: string[];
  required?: boolean;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitButtonText?: string;
  className?: string;
}

export function DynamicForm({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  className = '',
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.type === 'checkbox' ? (
            <Checkbox
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
          ) : field.type === 'select' ? (
            <Select onValueChange={(value) => handleChange(field.name, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {field.options?.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="border-b border-black p-4 text-black"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}
      <Button type="submit" className="bg-primary text-white">
        {submitButtonText}
      </Button>
    </form>
  );
}
