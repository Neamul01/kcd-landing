import { useState, useEffect } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { User } from "@/types/user";
import Axios from "@/lib/Axios";

export function useUser(): {
  data: User | null;
  error: string;
  loading: boolean;
} {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response: AxiosResponse<{ data: User }> = await Axios.get<{
          data: User;
        }>("/auth/me");
        setUser(response.data?.data);
        // console.log(response.data?.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
          setError("Unauthorized");
        } else {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return { data: user, error, loading };
}
