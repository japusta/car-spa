// src/components/SortControls.tsx
import React from 'react';
import styles from '../styles/SortControls.module.scss';

export interface SortControlsProps {
  onChange: (sortBy: 'year' | 'price' | null) => void;
  onSearch: (query: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ onChange, onSearch }) => (
  <div className={styles.container}>
    <div className={styles.filterGroup}>
      <span className={styles.label}>Search:</span>
      <input
        type="text"
        placeholder="Name or model..."
        onChange={e => onSearch(e.target.value)}
        className={styles.searchInput}
      />
    </div>
    <div className={styles.sortGroup}>
      <span className={styles.label}>Sort by:</span>
      <select
        defaultValue=""
        onChange={e => onChange(e.target.value === '' ? null : (e.target.value as 'year' | 'price'))}
        className={styles.select}
      >
        <option value="">None</option>
        <option value="year">Year</option>
        <option value="price">Price</option>
      </select>
    </div>
  </div>
);

export default SortControls;
