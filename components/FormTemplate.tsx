import React from 'react';
import CmsManagedForm from './CmsManagedForm';

interface FormTemplateProps {
  formKey: string;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ formKey }) => {
  return (
    <div className="animate-in fade-in duration-500 bg-[#f9fafb] min-h-[60vh] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <CmsManagedForm formKey={formKey} />
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;
