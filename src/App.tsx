import React, { useEffect, useState, useMemo } from 'react';
import { Car } from './models/Car';
import { CarService } from './services/CarService';
import SortControls from './components/SortControls';
import CarList from './components/CarList';
import CarEditor from './components/CarEditor';
import MapView from './components/MapView';

const App: React.FC = () => {
  // const carService: ICarService = new CarService();
  const carService = new CarService();
  const [cars, setCars] = useState<Car[]>([]);
  const [sortedBy, setSortedBy] = useState<'year' | 'price' | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const load = async () => {
    setLoading(true);
    try {
      const data = await carService.fetchAll();
      setCars(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const sortedCars = useMemo(() => {
    if (!sortedBy) return cars;
    return [...cars].sort((a, b) => a[sortedBy] - b[sortedBy]);
  }, [cars, sortedBy]);

  const handleEdit = (car: Car) => setEditingCar(car);

  //  const handleSave = async (id: number, name: string, price: number) => {
  //    try {
  //      await carService.update({ id, name, price });
  //      setEditingCar(null);
  //      load();
  //    } catch (err: any) {
  //      console.error(err);
  //      alert('Не удалось сохранить данные: ' + err.message);
  //    }
  //  };

  // просто обновляем локальный state
  const handleSave = (id: number, name: string, price: number) => {
    setCars(prev =>
      prev.map(c => (c.id === id ? { ...c, name, price } : c))
    );
    setEditingCar(null);
  };

  // const handleDelete = async (id: number) => {
  //   await carService.delete(id);
  //   load();
  // };

     const handleSelect = (car: Car) => {
     setSelectedCar(car);
   };

   

  // удаляем из локального state
  const handleDelete = (id: number) => {
    if (window.confirm('Удалить эту машину?')) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };
  const handleCancel = () => setEditingCar(null);

  return (
    <div className="p-4">
      {editingCar && (
        <CarEditor
          car={editingCar}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <h1 className="text-2xl mb-4">Car SPA</h1>
      <SortControls onChange={setSortedBy} />
      {loading ? (
        <p>Loading...</p>
      ) : (
            <CarList
              cars={sortedCars}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}   
            />
      )}
      <MapView cars={cars} focusCar={selectedCar} />
    </div>
  );
};

export default App;