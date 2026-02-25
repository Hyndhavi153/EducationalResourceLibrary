import React from 'react';
import { Resource } from '../services/api';
import './ResourceList.css';

interface ResourceListProps {
  resources: Resource[];
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const ResourceList: React.FC<ResourceListProps> = ({ resources, onDelete, isAdmin = false }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (resources.length === 0) {
    return <div className="no-resources">No resources found</div>;
  }

  return (
    <div className="resource-list">
      <table className="resources-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Author</th>
            <th>Category</th>
            <th>Size</th>
            <th>Downloads</th>
            <th>Rating</th>
            <th>Feedback</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td className="title-col">{resource.title}</td>
              <td>{resource.type.replace('_', ' ')}</td>
              <td>{resource.author}</td>
              <td>{resource.category}</td>
              <td>{formatFileSize(resource.fileSize)}</td>
              <td>{resource.downloads}</td>
              <td>⭐ {resource.rating}</td>
              <td>{resource.feedback.length}</td>
              {isAdmin && (
                <td className="actions-col">
                  <button
                    className="btn-delete"
                    onClick={() => onDelete?.(resource.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceList;
