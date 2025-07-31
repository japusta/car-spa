import React, { useState, useRef, useEffect } from 'react';
import { Car } from '../models/Car';
import styles from '../styles/CarEditor.module.scss';

type CarEditorProps = {
  car: Car;
  onSave: (id: number, name: string, price: number) => void;
  onCancel: () => void;
};

const CarEditor: React.FC<CarEditorProps> = ({ car, onSave, onCancel }) => {
  const [name, setName] = useState(car.name);
  const [price, setPrice] = useState(car.price);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  const isValid = name.trim() !== '' && price > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSave(car.id, name, price);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="edit-car-title">
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 id="edit-car-title" className={styles.title}>Edit Car</h2>

        <div className={styles.field}>
          <label htmlFor="car-name">Name:</label>
          <input
            id="car-name"
            ref={nameRef}
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
          />
          {!name.trim() && <p className={styles.error}>Name cannot be empty.</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="car-price">Price:</label>
          <input
            id="car-price"
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className={styles.input}
          />
          {price <= 0 && <p className={styles.error}>Price must be greater than zero.</p>}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button type="submit" className={styles.save} disabled={!isValid}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default CarEditor;
