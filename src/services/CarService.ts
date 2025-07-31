import { Car } from '../models/Car';
import { ICarService } from './ICarService';

export class CarService implements ICarService {
  private readonly endpoint = 'https://ofc-test-01.tspb.su/test-task/vehicles';

  async fetchAll(): Promise<Car[]> {
    const resp = await fetch(this.endpoint);
    if (!resp.ok) throw new Error('Failed to load vehicles');
    return resp.json();
  }

  // async update(data: { id: number; name: string; price: number }): Promise<void> {
  //   const resp = await fetch(`${this.endpoint}/${data.id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   });
  //   if (!resp.ok) throw new Error('Failed to update vehicle');
  // }

  // async delete(id: number): Promise<void> {
  //   const resp = await fetch(`${this.endpoint}/${id}`, {
  //     method: 'DELETE',
  //   });
  //   if (!resp.ok) throw new Error('Failed to delete vehicle');
  // }
}