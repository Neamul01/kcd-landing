export type Ticket = {
  _id: string;
  title: string;
  description: string;
  price: string;
  availability: boolean;
  user: string;
  createdAt: string;
  quantity: number;
};

export type Order = {
  tax: number;
  shippingFee: number;
  cartItems: {
    name: string;
    price: number;
    quantity: number;
    ticket: string;
  }[];
};
