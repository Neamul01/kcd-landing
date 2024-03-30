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

export type CartItem = {
  title: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
  ticket: string | undefined;
};

export type Order = {
  name: string;
  email: string;
  phone: {
    number: string;
    promotion: boolean | undefined;
  };
  track: string;
  workshop: string[];
  tshirt: string;
  address: string;
  cartItems: CartItem[];
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
