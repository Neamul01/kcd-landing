import { create } from "zustand";

// Define the store interface
interface FormStore {
  data: {
    email: string;
    name: string;
    address: string;
    tshirt: string;
    promotion?: boolean;
    terms: boolean;
    track?: string;
    workshop?: string[];
  };
  isSubmit: boolean;
  errors: Record<string, string | undefined>;
  setData: (data: Partial<FormStore["data"]>) => void;
  setIsSubmit: (data: boolean) => void;
  setErrors: (errors: Record<string, string | undefined>) => void;
}

// Create the store
export const useDetailsStore = create<FormStore>((set) => ({
  data: {
    email: "",
    name: "",
    mobile: "",
    address: "",
    tshirt: "",
    terms: false,
  },
  isSubmit: false,
  errors: {},
  setIsSubmit: (data) => set((state) => ({ isSubmit: data })),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  setErrors: (errors) => set({ ...errors }),
}));

// Optionally, you can use the useStore hook for convenient access to the store
export const useDetailsData = () => {
  const { data, setData, errors, setErrors } = useDetailsStore();
  return { data, setData, errors, setErrors };
};
