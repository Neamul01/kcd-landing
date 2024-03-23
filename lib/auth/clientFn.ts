import Axios from "@/lib/Axios";
import { Router } from "next/router";

export const signOut = async (router: Router) => {
  try {
    await Axios.get("auth/logout");
    localStorage.removeItem("token");

    router.replace("/");
  } catch (error) {
    // Handle any errors that might occur during sign-out
    console.error("Error occurred during sign-out:", error);
  }
};
