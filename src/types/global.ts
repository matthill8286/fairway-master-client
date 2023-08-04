export type Children<T> = {
  children: NonNullable<T>;
};

export type MyArray<T> = Array<T>;

export type AddNewProperty<T> = {
  [K in keyof T]: T[K];
} & { newProperty: string };

export type AddWithID = {
  id?: string;
};
