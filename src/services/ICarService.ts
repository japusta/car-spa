import { Car } from '../models/Car';

export interface ICarService {
  fetchAll(): Promise<Car[]>;
  // update(data: { id: number; name: string; price: number }): Promise<void>;
  // delete(id: number): Promise<void>;
}