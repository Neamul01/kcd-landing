import { Order } from "@/types/types";
import { create } from "zustand";

// Define the store interface
interface FormStore {
  data: Order;
  isSubmit: boolean;
  errors: Record<string, string | undefined>;
  setData: (data: Partial<FormStore["data"]>) => void;
  setIsSubmit: (data: boolean) => void;
  setErrors: (errors: Record<string, string | undefined>) => void;
  clearErrors: () => void;
}

// Create the store
export const useDetailsStore = create<FormStore>((set) => ({
  data: {
    name: "",
    email: "",
    phone: {
      number: "",
      promotion: false,
    },
    track: "",
    workshop: [""],
    tshirt: "",
    address: "",
    cartItems: [
      {
        title: "",
        price: 0,
        quantity: 1,
        ticket: "",
      },
    ],
  },
  isSubmit: false,
  errors: {},
  setIsSubmit: (data) => set((state) => ({ isSubmit: data })),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  setErrors: (errors) => set({ ...errors }),
  clearErrors: () => set({ errors: {} }),
}));

// Optionally, you can use the useStore hook for convenient access to the store
export const useDetailsData = () => {
  const { data, setData, errors, setErrors, clearErrors } = useDetailsStore();
  return { data, setData, errors, setErrors, clearErrors };
};
