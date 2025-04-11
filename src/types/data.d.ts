export {};

declare global {
  type Select = {
    value: string;
    label: string;
  };

  type Order = {
    id?: string;
    phone: string;
    otp: string;
    status: string;
    items: string[];
    categoryId: string;
  };

  type Category = {
    id?: string;
    name: string;
    createdAt?: string;
  };

  type Menu = {
    id?: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
    createdAt?: string;
  };

  type Login = {
    email: string;
    password: string;
  }
}
