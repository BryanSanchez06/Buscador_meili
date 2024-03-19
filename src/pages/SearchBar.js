// components/SearchBar.js
import React from 'react';
import styles from '@/styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      onSearch('');  // Limpia los resultados de la búsqueda cuando el campo de búsqueda está vacío
    } else {
      onSearch(e.target.value);
    }
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
      </form>
    </div>
  );
}

export default SearchBar;
