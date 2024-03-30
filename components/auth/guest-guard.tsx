"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import Axios from "@/lib/Axios";
import { AxiosResponse } from "axios";

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({
  children,
}: GuestGuardProps): React.ReactElement | null {
  const router = useRouter();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await Axios.get("/auth/me");
      if (response.data) {
        logger.debug(
          "[GuestGuard]: User is logged in, redirecting to dashboard"
        );
        router.replace(paths.dashboard.overview);
      } else {
        setIsChecking(false);
      }
    } catch (error) {
      logger.error(
        "[GuestGuard]: Error occurred while checking user permissions",
        error
      );
      setIsChecking(false);
    }
  };

  React.useEffect(() => {
    checkPermissions();
  }, []);

  if (isChecking) {
    return null; // You might want to show a loader here while checking permissions
  }

  return <React.Fragment>{children}</React.Fragment>;
}
