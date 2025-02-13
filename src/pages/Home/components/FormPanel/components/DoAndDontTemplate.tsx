'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface DoAndDontTemplate {
  title: string;
  socialHandler: string;
  dosTitle: string;
  dontsTitle: string;
  dosPoints: string[];
  dontsPoints: string[];
}

interface DoAndDontTemplateFormProps {
  onSubmit: (data: DoAndDontTemplate) => void;
}

export function DoAndDontTemplateForm({
  onSubmit,
}: DoAndDontTemplateFormProps) {
  const [template, setTemplate] = useState<DoAndDontTemplate>({
    title: '',
    socialHandler: '',
    dosTitle: '',
    dontsTitle: '',
    dosPoints: [''],
    dontsPoints: [''],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field:
      | keyof DoAndDontTemplate
      | { type: 'dosPoints' | 'dontsPoints'; index: number },
  ) => {
    if (typeof field === 'string') {
      setTemplate({ ...template, [field]: e.target.value });
    } else {
      const { type, index } = field;
      const newPoints = [...template[type]];
      newPoints[index] = e.target.value;
      setTemplate({ ...template, [type]: newPoints });
    }
  };

  const addPoint = (type: 'dosPoints' | 'dontsPoints') => {
    setTemplate({ ...template, [type]: [...template[type], ''] });
  };

  const removePoint = (type: 'dosPoints' | 'dontsPoints', index: number) => {
    const newPoints = template[type].filter((_, i) => i !== index);
    setTemplate({ ...template, [type]: newPoints });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(template);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Template Title</Label>
        <Input
          id="title"
          value={template.title}
          onChange={(e) => handleChange(e, 'title')}
          required
        />
      </div>

      <div>
        <Label htmlFor="socialHandler">
          Social Handler (your unique handler for content)
        </Label>
        <Input
          id="socialHandler"
          value={template.socialHandler}
          onChange={(e) => handleChange(e, 'socialHandler')}
          required
        />
      </div>

      <div>
        <Label htmlFor="dosTitle">{"Do's Title"}</Label>
        <Input
          id="dosTitle"
          value={template.dosTitle}
          onChange={(e) => handleChange(e, 'dosTitle')}
          required
        />
      </div>

      <div>
        <Label>{"Do's Points"}</Label>
        {template.dosPoints.map((point, index) => (
          <div key={`do-${index}`} className="mt-2 flex items-center">
            <Input
              value={point}
              onChange={(e) => handleChange(e, { type: 'dosPoints', index })}
              placeholder={`Do point ${index + 1}`}
              required
            />
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePoint('dosPoints', index)}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addPoint('dosPoints')}
          className="mt-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Do Point
        </Button>
      </div>

      <div>
        <Label htmlFor="dontsTitle">{"Don'ts Title"}</Label>
        <Input
          id="dontsTitle"
          value={template.dontsTitle}
          onChange={(e) => handleChange(e, 'dontsTitle')}
          required
        />
      </div>

      <div>
        <Label>{"Don'ts Points"}</Label>
        {template.dontsPoints.map((point, index) => (
          <div key={`dont-${index}`} className="mt-2 flex items-center">
            <Input
              value={point}
              onChange={(e) => handleChange(e, { type: 'dontsPoints', index })}
              placeholder={`Don't point ${index + 1}`}
              required
            />
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePoint('dontsPoints', index)}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addPoint('dontsPoints')}
          className="mt-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {"Add Don't Point"}
        </Button>
      </div>

      <Button className="bg-primary text-white" type="submit">
        Create Template
      </Button>
    </form>
  );
}
