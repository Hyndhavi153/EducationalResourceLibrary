import React, { useState } from 'react';
import './ResourceForm.css';

interface ResourceFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'textbook' as const,
    author: '',
    category: '',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.author || !formData.category) {
      setError('All fields are required');
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('type', formData.type);
      fd.append('author', formData.author);
      fd.append('category', formData.category);
      fd.append('tags', formData.tags);

      await onSubmit(fd);

      setFormData({
        title: '',
        description: '',
        type: 'textbook',
        author: '',
        category: '',
        tags: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to upload resource');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resource-form">
      <h3>Upload New Resource</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Resource Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter resource title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter resource description"
          rows={4}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Resource Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="textbook">Textbook</option>
            <option value="research_paper">Research Paper</option>
            <option value="study_guide">Study Guide</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Comma-separated tags"
          />
        </div>
      </div>

      <button type="submit" className="btn-submit" disabled={submitting}>
        {submitting ? 'Uploading...' : 'Upload Resource'}
      </button>
    </form>
  );
};

export default ResourceForm;
