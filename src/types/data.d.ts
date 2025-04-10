export {};

declare global {
  type Select = {
    value: string;
    label: string;
  };

  type Category = {
    id?: string;
    name?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
