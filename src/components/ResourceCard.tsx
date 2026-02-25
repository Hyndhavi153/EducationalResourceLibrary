import { useState } from 'react';
import { Resource } from '../services/api';
import FeedbackSection from './FeedbackSection';
import './ResourceCard.css';

interface ResourceCardProps {
  resource: Resource;
  onDownload: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownload }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'textbook':
        return '📖';
      case 'research_paper':
        return '📄';
      case 'study_guide':
        return '📝';
      default:
        return '📎';
    }
  };

  return (
    <div className="resource-card">
      <div className="card-header">
        <div className="type-icon">{getTypeIcon(resource.type)}</div>
        <span className="type-badge">{resource.type.replace('_', ' ')}</span>
      </div>

      <h3 className="card-title">{resource.title}</h3>
      <p className="card-description">{resource.description}</p>

      <div className="card-meta">
        <p><strong>Author:</strong> {resource.author}</p>
        <p><strong>Category:</strong> {resource.category}</p>
        <p><strong>Uploaded:</strong> {resource.uploadedAt}</p>
        <p><strong>Size:</strong> {formatFileSize(resource.fileSize)}</p>
      </div>

      <div className="card-tags">
        {resource.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="card-stats">
        <span className="stat">⭐ {resource.rating}</span>
        <span className="stat">📥 {resource.downloads}</span>
        <span className="stat">💬 {resource.feedback.length}</span>
      </div>

      <div className="card-actions">
        <button className="btn-download" onClick={() => onDownload(resource.id)}>
          ⬇️ Download
        </button>
        <button
          className="btn-feedback"
          onClick={() => setShowFeedback(!showFeedback)}
        >
          {showFeedback ? '✕ Hide' : '💭 Feedback'}
        </button>
      </div>

      {showFeedback && (
        <FeedbackSection resourceId={resource.id} feedback={resource.feedback} />
      )}
    </div>
  );
};

export default ResourceCard;
