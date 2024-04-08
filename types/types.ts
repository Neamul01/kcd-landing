export type Ticket = {
  _id: string;
  bookCount: number;
  title: string;
  description: string;
  price: string;
  isAvailable: boolean;
  user: string;
  createdAt: string;
  quantity: number;
  ticketType: string;
  timing: string;
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
  schedule: string;
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
