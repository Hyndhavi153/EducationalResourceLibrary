import React, { useState, useEffect } from 'react';
import { api, Resource } from '../services/api';
import ResourceForm from '../components/ResourceForm';
import ResourceList from '../components/ResourceList';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalDownloads: 0,
    avgRating: 0,
    totalFeedback: 0
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    try {
      const data = await api.getResources();
      setResources(data);
      calculateStats(data);
    } catch (error) {
      console.error('Failed to load resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Resource[]) => {
    const totalResources = data.length;
    const totalDownloads = data.reduce((sum, r) => sum + r.downloads, 0);
    const avgRating = data.length > 0
      ? Math.round((data.reduce((sum, r) => sum + r.rating, 0) / data.length) * 10) / 10
      : 0;
    const totalFeedback = data.reduce((sum, r) => sum + r.feedback.length, 0);

    setStats({
      totalResources,
      totalDownloads,
      avgRating,
      totalFeedback
    });
  };

  const handleUpload = async (formData: FormData) => {
    try {
      await api.uploadResource(formData);
      setShowForm(false);
      loadResources();
    } catch (error) {
      console.error('Failed to upload resource:', error);
    }
  };

  const handleDelete = async (resourceId: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await api.deleteResource(resourceId);
        loadResources();
      } catch (error) {
        console.error('Failed to delete resource:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <button className="btn-upload" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Upload Resource'}
        </button>
      </div>

      {showForm && (
        <div className="upload-section">
          <ResourceForm onSubmit={handleUpload} />
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Resources</h3>
          <p className="stat-value">{stats.totalResources}</p>
        </div>
        <div className="stat-card">
          <h3>Total Downloads</h3>
          <p className="stat-value">{stats.totalDownloads}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-value">⭐ {stats.avgRating}</p>
        </div>
        <div className="stat-card">
          <h3>Feedback Count</h3>
          <p className="stat-value">{stats.totalFeedback}</p>
        </div>
      </div>

      <div className="resources-section">
        <h2>Manage Resources</h2>
        {loading ? (
          <div className="loading">Loading resources...</div>
        ) : (
          <ResourceList resources={resources} onDelete={handleDelete} isAdmin={true} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
