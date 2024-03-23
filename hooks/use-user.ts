import { useState, useEffect } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { User } from "@/types/user";
import Axios from "@/lib/Axios";

export function useUser(): { data: User | null; error: string } {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response: AxiosResponse<{ data: User }> = await Axios.get<{
          data: User;
        }>("/auth/me");
        setUser(response.data?.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
          setError("Unauthorized");
        } else {
          setError("Failed to fetch user data");
        }
      }
    }

    fetchUser();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return { data: user, error };
}
