// src/repositories/Repository.ts
import { BaseRepository } from "./BaseRepository";

export class Repository<T> implements BaseRepository<T> {
  private data: T[];

  constructor(initialData: T[]) {
    this.data = initialData;
  }

  getAll(): Promise<T[]> {
    return Promise.resolve(this.data);
  }

  getById(id: number): Promise<T | null> {
    const item = this.data.find((item) => (item as any).id === id);
    return Promise.resolve(item || null);
  }

  create(data: Partial<T>): Promise<T> {
    const newItem: T = { ...data, id: this.data.length + 1 } as any;
    this.data.push(newItem);
    return Promise.resolve(newItem);
  }

  update(id: number, data: Partial<T>): Promise<T | null> {
    const itemIndex = this.data.findIndex((item) => (item as any).id === id);

    if (itemIndex !== -1) {
      const updatedItem = { ...this.data[itemIndex], ...data };
      this.data[itemIndex] = updatedItem;
      return Promise.resolve(updatedItem);
    }

    return Promise.resolve(null);
  }

  delete(id: number): Promise<void> {
    const itemIndex = this.data.findIndex((item) => (item as any).id === id);

    if (itemIndex !== -1) {
      this.data.splice(itemIndex, 1);
    }

    return Promise.resolve();
  }
}
