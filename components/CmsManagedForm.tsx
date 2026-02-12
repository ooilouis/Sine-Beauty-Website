import React, { useEffect, useMemo, useState } from 'react';
import { useCmsData, type CmsForm } from '../contexts/CmsDataContext';

interface CmsManagedFormProps {
  formKey: string;
  className?: string;
  hideTitle?: boolean;
  extraPayload?: Record<string, string>;
}

const fallbackForm: CmsForm = {
  id: -1,
  key: 'fallback-form',
  name: 'Fallback Form',
  title: 'Get In Touch',
  description: 'Share your details and our team will connect with you shortly.',
  buttonText: 'Submit',
  successMessage: 'Thanks. Your request has been captured.',
  submitMode: 'none',
  submitTarget: '',
  isActive: true,
  sort_order: 0,
  fields: [
    { id: 1, name: 'full_name', label: 'Full Name', type: 'text', required: true, placeholder: 'Your name', sort_order: 0 },
    { id: 2, name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+65', sort_order: 1 },
    { id: 3, name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help?', sort_order: 2 },
  ],
};

const CmsManagedForm: React.FC<CmsManagedFormProps> = ({ formKey, className = '', hideTitle = false, extraPayload }) => {
  const { forms } = useCmsData();
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const form = useMemo(() => {
    const activeMatch = forms.find((item) => item.key === formKey && item.isActive);
    if (activeMatch) return activeMatch;

    const anyMatch = forms.find((item) => item.key === formKey);
    if (anyMatch) return anyMatch;

    return fallbackForm;
  }, [formKey, forms]);

  const fields = useMemo(
    () =>
      [...(form.fields || [])].sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA === orderB) return a.id - b.id;
        return orderA - orderB;
      }),
    [form.fields]
  );

  useEffect(() => {
    const initialValues = Object.fromEntries(fields.map((field) => [field.name, '']));
    setValues(initialValues);
    setSubmitted(false);
    setError('');
  }, [fields, form.id]);

  const handleFieldChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const submitViaMailto = (payloadLines: string[]) => {
    const targetEmail = (form.submitTarget || '').trim();
    if (!targetEmail) return;

    const subject = encodeURIComponent(`${form.title || form.name} Submission`);
    const body = encodeURIComponent(payloadLines.join('\n'));
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const submitViaWhatsApp = (payloadLines: string[]) => {
    const target = (form.submitTarget || '').trim();
    if (!target) return;

    const message = encodeURIComponent(payloadLines.join('\n'));
    const directUrl = target.startsWith('http://') || target.startsWith('https://');

    if (directUrl) {
      const separator = target.includes('?') ? '&' : '?';
      window.open(`${target}${separator}text=${message}`, '_blank', 'noopener,noreferrer');
      return;
    }

    const digits = target.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${digits}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const missingRequired = fields.find((field) => field.required && !(values[field.name] || '').trim());
    if (missingRequired) {
      setError(`Please complete required field: ${missingRequired.label}`);
      return;
    }

    const payloadLines = [
      `${form.title || form.name}`,
      '',
      ...fields.map((field) => `${field.label}: ${values[field.name] || '-'}`),
      ...Object.entries(extraPayload || {}).map(([key, value]) => `${key}: ${value || '-'}`),
    ];

    if (form.submitMode === 'mailto') {
      submitViaMailto(payloadLines);
    }

    if (form.submitMode === 'whatsapp') {
      submitViaWhatsApp(payloadLines);
    }

    setSubmitted(true);
  };

  if (fields.length === 0) {
    return (
      <div className={`rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-700 ${className}`}>
        This form has no fields yet. Add fields in CMS Form Builder.
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      {!hideTitle && (
        <div className="mb-5">
          <h3 className="text-2xl font-serif text-gray-900">{form.title || form.name}</h3>
          {form.description && <p className="mt-2 text-gray-600">{form.description}</p>}
        </div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => {
            const value = values[field.name] || '';
            const required = field.required;
            const placeholder = field.placeholder || '';

            if (field.type === 'textarea') {
              return (
                <div key={field.id}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {field.label}
                    {required && <span className="text-rose-500">*</span>}
                  </label>
                  <textarea
                    value={value}
                    onChange={(event) => handleFieldChange(field.name, event.target.value)}
                    placeholder={placeholder}
                    required={required}
                    className="h-28 w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              );
            }

            if (field.type === 'select') {
              return (
                <div key={field.id}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {field.label}
                    {required && <span className="text-rose-500">*</span>}
                  </label>
                  <select
                    value={value}
                    onChange={(event) => handleFieldChange(field.name, event.target.value)}
                    required={required}
                    className="w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="">{placeholder || `Select ${field.label}`}</option>
                    {(field.options || []).map((option, index) => (
                      <option key={`${field.id}-option-${index}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            const inputType = field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text';

            return (
              <div key={field.id}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {field.label}
                  {required && <span className="text-rose-500">*</span>}
                </label>
                <input
                  type={inputType}
                  value={value}
                  onChange={(event) => handleFieldChange(field.name, event.target.value)}
                  placeholder={placeholder}
                  required={required}
                  className="w-full rounded border border-gray-200 px-3 py-2 focus:border-teal-500 focus:outline-none"
                />
              </div>
            );
          })}

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-teal-600"
          >
            {form.buttonText || 'Submit'}
          </button>
        </form>
      ) : (
        <div className="rounded border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <p>{form.successMessage || 'Thanks. Your form has been submitted.'}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 rounded border border-emerald-300 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
          >
            Submit Another Response
          </button>
        </div>
      )}
    </div>
  );
};

export default CmsManagedForm;
