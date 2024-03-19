// components/SearchBar.js
import React from 'react';
import styles from '@/styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
        <input 
          type="text" 
          placeholder="Buscar..."
          value={query}
          onChange={handleChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
