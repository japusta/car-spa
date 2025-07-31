import React, { useEffect, useState, useMemo } from 'react';
import { Car } from './models/Car';
import { CarService } from './services/CarService';
import SortControls from './components/SortControls';
import CarList from './components/CarList';
import CarEditor from './components/CarEditor';
import MapView from './components/MapView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  // const carService: ICarService = new CarService();
  const carService = new CarService();
  const [cars, setCars] = useState<Car[]>([]);
  const [sortedBy, setSortedBy] = useState<'year' | 'price' | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await carService.fetchAll();
      setCars(data);
      toast.success('Cars loaded successfully!');

    } catch (err) {
      console.error(err);
      toast.error('Failed to load cars.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filteredCars = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return cars.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q)
    );
  }, [cars, searchQuery]);

  const sortedCars = useMemo(() => {
    if (!sortedBy) return filteredCars;
    return [...filteredCars].sort((a, b) => a[sortedBy] - b[sortedBy]);
  }, [filteredCars, sortedBy]);


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
  setCars(prev => prev.map(c => c.id === id ? { ...c, name, price } : c));
  setEditingCar(null);
  toast.success('Car saved successfully!');
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
  if (window.confirm('Delete this car?')) {
    setCars(prev => prev.filter(c => c.id !== id));
    toast.info('Car deleted.');
  }
};
  const handleCancel = () => setEditingCar(null);

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" />
      {editingCar && (
        <CarEditor
          car={editingCar}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <h1 className="text-2xl mb-4">Car SPA</h1>
      <SortControls
        onChange={setSortedBy}
        onSearch={setSearchQuery}
      />
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