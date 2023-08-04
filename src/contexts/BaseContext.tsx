import React, { createContext, useContext, useEffect, useState } from "react";
import { BaseRepository } from "../repositories/BaseRepository";

interface BaseContextValue<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  fetchAll: () => void;
  create: (data: Partial<T>) => void;
  update: (id: number, data: Partial<T>) => void;
  remove: (id: number) => void;
}



const initialContextValue = {
  data: [],
  loading: false,
  error: null,
  fetchAll: () => {},
  create: () => {},
  update: () => {},
  remove: () => {},
};

export function createBaseContext<T>(repository: BaseRepository<T>) {
  const Context = createContext<BaseContextValue<T>>(initialContextValue);

  return {
    Provider: ({ children }: { children: React.ReactNode }) => {
      const [data, setData] = useState<T[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<Error | null>(null);

      useEffect(() => {
        fetchAll();
      }, []);

      const fetchAll = async () => {
        try {
          setLoading(true);
          setError(null);

          const fetchedData = await repository.getAll();

          setData(fetchedData);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      const create = async (create: Partial<T>) => {
        try {
          setLoading(true);
          setError(null);

          const newData = await repository.create(create);

          setData([...data, newData]);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      const update = async (id: number, updates: Partial<T>) => {
        try {
          setLoading(true);
          setError(null);

          const updatedData = await repository.update(id, updates);

          if (updatedData) {
            // FIXME: investigate generics
            // @ts-expect-error: investigate generics extension of missing id on type T
            setData(data.map((item) => (item.id === id ? updatedData : item)));
          }
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      const remove = async (id: number) => {
        try {
          setLoading(true);
          setError(null);

          await repository.delete(id);

          // FIXME: investigate generics
          // @ts-expect-error: investigate generics extension of missing id on type T
          setData(data.filter((item) => item.id !== id));
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      return (
        <Context.Provider
          value={{ data, loading, error, fetchAll, create, update, remove }}
        >
          {children}
        </Context.Provider>
      );
    },
    useDataContext: () => useContext(Context),
  };
}
