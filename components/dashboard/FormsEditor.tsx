import React, { useMemo, useState } from 'react';
import { Plus, Edit2, Trash2, Save, ArrowUp, ArrowDown, FormInput } from 'lucide-react';
import { useCmsData, type CmsForm, type CmsFormField, type CmsFormFieldType, type CmsFormSubmitMode } from '../../contexts/CmsDataContext';

const fieldTypeOptions: Array<{ value: CmsFormFieldType; label: string }> = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Dropdown' },
];

const submitModeOptions: Array<{ value: CmsFormSubmitMode; label: string }> = [
  { value: 'none', label: 'On-page success only' },
  { value: 'mailto', label: 'Open email app (mailto)' },
  { value: 'whatsapp', label: 'Open WhatsApp chat' },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const FormsEditor: React.FC = () => {
  const { forms, setForms } = useCmsData();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [formData, setFormData] = useState<Partial<CmsForm>>({});

  const sortedForms = useMemo(
    () =>
      [...forms].sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA === orderB) return a.id - b.id;
        return orderA - orderB;
      }),
    [forms]
  );

  const fields = useMemo(() => {
    return [...(formData.fields || [])].sort((a, b) => {
      const orderA = a.sort_order ?? 0;
      const orderB = b.sort_order ?? 0;
      if (orderA === orderB) return a.id - b.id;
      return orderA - orderB;
    });
  }, [formData.fields]);

  const isValid = Boolean(
    (formData.name || '').trim() &&
      (formData.key || '').trim() &&
      (formData.title || '').trim() &&
      (formData.buttonText || '').trim() &&
      fields.length > 0
  );

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      key: '',
      title: '',
      description: '',
      buttonText: 'Submit',
      successMessage: 'Thanks. Your form has been submitted.',
      submitMode: 'none',
      submitTarget: '',
      isActive: true,
      fields: [
        {
          id: 1,
          name: 'full_name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Your name',
          required: true,
          sort_order: 0,
        },
      ],
      sort_order: sortedForms.length,
    });
    setMessage(null);
  };

  const handleEdit = (form: CmsForm) => {
    setIsCreating(false);
    setEditingId(form.id);
    setFormData({
      ...form,
      fields: [...form.fields],
    });
    setMessage(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({});
  };

  const setFieldAt = (index: number, updates: Partial<CmsFormField>) => {
    setFormData((prev) => {
      const next = [...(prev.fields || [])];
      next[index] = {
        ...next[index],
        ...updates,
      };
      return { ...prev, fields: next };
    });
  };

  const addField = () => {
    setFormData((prev) => {
      const existing = [...(prev.fields || [])];
      const nextId = existing.length > 0 ? Math.max(...existing.map((field) => field.id || 0)) + 1 : 1;
      existing.push({
        id: nextId,
        name: `field_${nextId}`,
        label: `Field ${nextId}`,
        type: 'text',
        placeholder: '',
        required: false,
        sort_order: existing.length,
      });
      return { ...prev, fields: existing };
    });
  };

  const removeField = (index: number) => {
    setFormData((prev) => {
      const next = [...(prev.fields || [])];
      next.splice(index, 1);
      return {
        ...prev,
        fields: next.map((field, idx) => ({ ...field, sort_order: idx })),
      };
    });
  };

  const reorderFields = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setFormData((prev) => {
      const next = [...(prev.fields || [])];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return {
        ...prev,
        fields: next.map((field, index) => ({ ...field, sort_order: index })),
      };
    });
  };

  const saveForm = () => {
    const normalizedKey = slugify(formData.key || formData.name || '');
    if (!normalizedKey) {
      setMessage({ type: 'error', text: 'Form key is required.' });
      return;
    }

    if (!isValid) {
      setMessage({ type: 'error', text: 'Form name, key, title, button text and at least one field are required.' });
      return;
    }

    const duplicate = sortedForms.find((form) => form.key === normalizedKey && form.id !== editingId);
    if (duplicate) {
      setMessage({ type: 'error', text: 'Form key already exists. Use a unique key.' });
      return;
    }

    const normalizedFields = fields
      .map((field, index) => {
        const normalizedName = slugify(field.name || field.label || `field-${index + 1}`);
        const normalizedType: CmsFormFieldType = field.type || 'text';
        const options =
          normalizedType === 'select'
            ? (field.options || []).map((option) => option.trim()).filter(Boolean)
            : undefined;

        return {
          ...field,
          id: field.id || index + 1,
          name: normalizedName,
          label: (field.label || '').trim() || `Field ${index + 1}`,
          type: normalizedType,
          placeholder: (field.placeholder || '').trim(),
          required: Boolean(field.required),
          options,
          sort_order: index,
        };
      })
      .filter((field) => field.label.trim().length > 0);

    if (normalizedFields.length === 0) {
      setMessage({ type: 'error', text: 'Add at least one valid field.' });
      return;
    }

    const payload: CmsForm = {
      id: editingId || 0,
      key: normalizedKey,
      name: (formData.name || '').trim(),
      title: (formData.title || '').trim(),
      description: (formData.description || '').trim(),
      buttonText: (formData.buttonText || '').trim(),
      successMessage: (formData.successMessage || '').trim() || 'Thanks. Your form has been submitted.',
      submitMode: formData.submitMode || 'none',
      submitTarget: (formData.submitTarget || '').trim(),
      isActive: Boolean(formData.isActive),
      fields: normalizedFields,
      sort_order: formData.sort_order ?? sortedForms.length,
    };

    setLoading(true);
    try {
      if (isCreating) {
        const nextId = sortedForms.length > 0 ? Math.max(...sortedForms.map((form) => form.id)) + 1 : 1;
        setForms((prev) => [...prev, { ...payload, id: nextId, sort_order: sortedForms.length }]);
      } else if (editingId) {
        setForms((prev) => prev.map((form) => (form.id === editingId ? { ...payload, id: editingId } : form)));
      }

      handleCancel();
      setMessage({ type: 'success', text: isCreating ? 'Form created.' : 'Form updated.' });
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = (id: number) => {
    if (!window.confirm('Delete this form?')) return;
    setForms((prev) => prev.filter((form) => form.id !== id).map((form, index) => ({ ...form, sort_order: index })));
    setMessage({ type: 'success', text: 'Form deleted.' });
  };

  const reorderForms = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const next = [...sortedForms];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setForms(next.map((form, index) => ({ ...form, sort_order: index })));
    setMessage({ type: 'success', text: 'Form order updated.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Forms ({sortedForms.length})</h3>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            <Plus size={18} />
            <span>Add Form</span>
          </button>
        )}
      </div>

      {message && (
        <div
          className={`rounded border px-4 py-3 text-sm ${
            message.type === 'error'
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {(isCreating || editingId) && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="mb-4 font-bold">{isCreating ? 'New Form' : 'Edit Form'}</h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Form Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: event.target.value,
                    key: prev.key || slugify(event.target.value),
                    title: prev.title || event.target.value,
                  }))
                }
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Form Key (for page placement)</label>
              <input
                type="text"
                value={formData.key || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, key: slugify(event.target.value) }))}
                className="w-full rounded border p-2"
                placeholder="contact-us"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                value={formData.buttonText || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, buttonText: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                className="h-20 w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Submit Mode</label>
              <select
                value={formData.submitMode || 'none'}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, submitMode: event.target.value as CmsFormSubmitMode }))
                }
                className="w-full rounded border p-2"
              >
                {submitModeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Submit Target</label>
              <input
                type="text"
                value={formData.submitTarget || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, submitTarget: event.target.value }))}
                className="w-full rounded border p-2"
                placeholder={
                  formData.submitMode === 'mailto'
                    ? 'enquiry@example.com'
                    : formData.submitMode === 'whatsapp'
                      ? '6587680183 or https://wa.me/...'
                      : 'Optional'
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Success Message</label>
              <textarea
                value={formData.successMessage || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, successMessage: event.target.value }))}
                className="h-20 w-full rounded border p-2"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                id="form-active"
                type="checkbox"
                checked={Boolean(formData.isActive)}
                onChange={(event) => setFormData((prev) => ({ ...prev, isActive: event.target.checked }))}
                className="h-4 w-4"
              />
              <label htmlFor="form-active" className="text-sm text-gray-700">Active (show on site)</label>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="font-semibold">Fields ({fields.length})</h5>
              <button
                onClick={addField}
                className="inline-flex items-center gap-1 rounded border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100"
              >
                <Plus size={14} /> Add Field
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded border border-gray-200 p-3">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input
                      type="text"
                      value={field.label || ''}
                      onChange={(event) => {
                        const label = event.target.value;
                        setFieldAt(index, {
                          label,
                          name: field.name || slugify(label),
                        });
                      }}
                      className="rounded border p-2"
                      placeholder="Field label"
                    />
                    <input
                      type="text"
                      value={field.name || ''}
                      onChange={(event) => setFieldAt(index, { name: slugify(event.target.value) })}
                      className="rounded border p-2"
                      placeholder="field_key"
                    />
                    <select
                      value={field.type || 'text'}
                      onChange={(event) =>
                        setFieldAt(index, {
                          type: event.target.value as CmsFormFieldType,
                          options: event.target.value === 'select' ? field.options || [] : undefined,
                        })
                      }
                      className="rounded border p-2"
                    >
                      {fieldTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={field.placeholder || ''}
                      onChange={(event) => setFieldAt(index, { placeholder: event.target.value })}
                      className="rounded border p-2"
                      placeholder="Placeholder"
                    />
                  </div>

                  {field.type === 'select' && (
                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-semibold text-gray-600">Dropdown Options (comma separated)</label>
                      <input
                        type="text"
                        value={(field.options || []).join(', ')}
                        onChange={(event) =>
                          setFieldAt(index, {
                            options: event.target.value.split(',').map((option) => option.trim()).filter(Boolean),
                          })
                        }
                        className="w-full rounded border p-2"
                        placeholder="Option A, Option B"
                      />
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={Boolean(field.required)}
                        onChange={(event) => setFieldAt(index, { required: event.target.checked })}
                        className="h-4 w-4"
                      />
                      Required
                    </label>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorderFields(index, Math.max(0, index - 1))}
                        disabled={index === 0}
                        className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => reorderFields(index, Math.min(fields.length - 1, index + 1))}
                        disabled={index === fields.length - 1}
                        className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => removeField(index)}
                        className="rounded p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="rounded border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                  No fields yet. Add at least one field.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button onClick={handleCancel} className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button
              onClick={saveForm}
              disabled={loading || !isValid}
              className="flex items-center space-x-2 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save Form'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {sortedForms.map((form, index) => (
          <div key={form.id} className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="rounded bg-slate-100 p-2 text-slate-600">
              <FormInput size={16} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-gray-900">{form.name}</h4>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${form.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {form.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
                  {form.submitMode}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">key: {form.key}</p>
              <p className="mt-1 text-xs text-gray-400">{form.fields.length} fields</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => reorderForms(index, Math.max(0, index - 1))}
                disabled={index === 0}
                className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => reorderForms(index, Math.min(sortedForms.length - 1, index + 1))}
                disabled={index === sortedForms.length - 1}
                className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              >
                <ArrowDown size={16} />
              </button>
              <button onClick={() => handleEdit(form)} className="rounded p-2 text-blue-600 hover:bg-blue-50">
                <Edit2 size={16} />
              </button>
              <button onClick={() => deleteForm(form.id)} className="rounded p-2 text-red-600 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormsEditor;
