import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Car } from '../models/Car';
import styles from '../styles/MapView.module.scss';
import L from 'leaflet';

type MapViewProps = {
  cars: Car[];
  focusCar?: Car | null;
};

// компонент для центрирования карты на метке
const Recenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
};

const MapView: React.FC<MapViewProps> = ({ cars, focusCar }) => {
  const defaultCenter: [number, number] = cars.length
    ? [cars[0].latitude, cars[0].longitude]
    : [0, 0];

  // центрирование по выбранной машине или по первой
  const center: [number, number] = focusCar
    ? [focusCar.latitude, focusCar.longitude]
    : defaultCenter;

  // рефы для маркеров
  const markerRefs = useRef<Record<number, L.Marker>>({});

  // при изменении focusCar открываем его попап
  useEffect(() => {
    if (focusCar) {
      const marker = markerRefs.current[focusCar.id];
      marker?.openPopup();
    }
  }, [focusCar]);

  return (
    <div className={styles.container}>
      <MapContainer
        center={defaultCenter}
        zoom={10}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {cars.map(car => (
          <Marker
            key={car.id}
            position={[car.latitude, car.longitude]}
            // записываем ссылку на leaflet-маркер
            ref={ref => {
              if (ref) markerRefs.current[car.id] = ref as any as L.Marker;
            }}
          >
            <Popup>{`${car.name} — ${car.model}`}</Popup>
          </Marker>
        ))}
        <Recenter center={center} />
      </MapContainer>
    </div>
  );
};

export default MapView;
