import React, { useState, useEffect } from 'react';
import { api, Resource } from '../services/api';
import ResourceCard from '../components/ResourceCard';
import SearchBar from '../components/SearchBar';
import './ResourceLibrary.css';

const ResourceLibrary: React.FC = () => {
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResources();
    loadCategories();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    try {
      const data = await api.getResources();
      setFilteredResources(data);
    } catch (error) {
      console.error('Failed to load resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    const filtered = await api.getResources(term, selectedCategory);
    setFilteredResources(filtered);
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    const filtered = await api.getResources(searchTerm, category || undefined);
    setFilteredResources(filtered);
  };

  const handleDownload = async (resourceId: string) => {
    try {
      const result = await api.downloadResource(resourceId);
      // In a real app, this would trigger an actual file download
      alert('Download started: ' + result.fileUrl);
      // Refresh resources to update download count
      loadResources();
    } catch (error) {
      console.error('Failed to download resource:', error);
    }
  };

  return (
    <div className="resource-library">
      <div className="library-header">
        <h1>📚 Resource Library</h1>
        <p>Search and access educational materials</p>
      </div>

      <div className="library-container">
        <aside className="filters-sidebar">
          <h2>Filters</h2>
          <div className="filter-group">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <main className="library-main">
          <SearchBar onSearch={handleSearch} />

          {loading ? (
            <div className="loading">Loading resources...</div>
          ) : (
            <div className="resources-grid">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onDownload={handleDownload}
                  />
                ))
              ) : (
                <div className="no-resources">
                  <p>No resources found. Try a different search or category.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResourceLibrary;
