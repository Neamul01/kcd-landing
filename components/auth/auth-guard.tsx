"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { useUser } from "@/hooks/use-user";
// import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({
  children,
}: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { data: user, loading: isLoading, error } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user === null && !isLoading) {
      logger.debug(
        "[AuthGuard]: User is not logged in, redirecting to sign in"
      );
      console.log("navigate to sign in", user);
      // router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  // React.useEffect(() => {
  //   if (!isLoading) {
  //     checkPermissions().catch(() => {
  //       // noop
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  // }, [user, error, isLoading]);
  React.useEffect(() => {
    if (!isLoading) {
      if (error) {
        setIsChecking(false);
        router.replace(paths.auth.signIn);
      } else if (!user) {
        logger.debug(
          "[AuthGuard]: User is not logged in, redirecting to sign in"
        );
        router.replace(paths.auth.signIn);
      } else {
        setIsChecking(false);
      }
    }
  }, [isLoading, user, error, router]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
