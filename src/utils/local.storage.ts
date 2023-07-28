// AdvancedLocalStorage.ts

export class AdvancedLocalStorage {
  // set item with try catch block to handle JSON.stringify errors
  public setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error setting localStorage key “${key}”`, e);
    }
  }

  // get item and return type T or null,
  // with a try catch block to handle JSON.parse errors
  public getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value as string) as T) : null;
    } catch (e) {
      console.warn(`Error getting localStorage key “${key}”`, e);
      return null;
    }
  }

  // remove item
  public removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing localStorage key “${key}”`, e);
    }
  }

  // clear all keys from localStorage
  public clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn(`Error clearing localStorage`, e);
    }
  }
}

const advancedLocalStorage = new AdvancedLocalStorage();

export default advancedLocalStorage;
