import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(car.id, name, price);
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Edit Car</h2>

        <div className={styles.field}>
          <label>Name:</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(parseFloat(e.target.value))}
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.save}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarEditor;
