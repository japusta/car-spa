import React from 'react';
import styles from '../styles/SortControls.module.scss'; 

export interface SortControlsProps {
  onChange: (sortBy: 'year' | 'price' | null) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ onChange }) => {
console.log('SortControls styles:', styles);

  return (
    <div className={styles.container}>
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
  );
};

export default SortControls;
