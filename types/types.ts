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
  name: string;
  email: string;
  phone: {
    number: string;
    promotion: boolean;
  };
  track: string;
  workshop: string[];
  tshirt: string;
  address: string;
  cartItems: {
    name: string;
    price: number;
    quantity: number;
    ticket: string;
  }[];
};

export type Workshop = {
  _id: string;
  title: string;
  description: string;
  limit: number;
  minimumSkill: string;
  availability: boolean;
  sessionTime: string;
  user: string;
  createdAt: string;
};

export type TicketSummery = {
  price?: number;
  discount?: number;
  subTotal?: number;
  total?: number;
};

export type Coupon = {
  code: string;
  discountPercentage: number;
  isAvailable: boolean;
};
