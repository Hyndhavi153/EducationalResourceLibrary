import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search by title, author, or tags..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
