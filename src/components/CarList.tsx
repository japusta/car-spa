import React from 'react';
import { Car } from '../models/Car';
import styles from '../styles/CarList.module.scss';

type CarListProps = {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
  onSelect: (car: Car) => void;  
};

const CarList: React.FC<CarListProps> = ({ cars, onEdit, onDelete, onSelect }) => {
  if (cars.length === 0) return <p>No cars available.</p>;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td
                onClick={() => onSelect(car)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {car.model}
              </td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>${car.price}</td>
              <td>
                <button className={styles.btnEdit} onClick={() => onEdit(car)}>Edit</button>
                <button className={styles.btnDelete} onClick={() => onDelete(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
