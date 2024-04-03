export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    account: "/dashboard",
    overview: "/dashboard/overview",
    participant: "/dashboard/participant",
    ticket: "/dashboard/ticket",
    schedules: "/dashboard/schedules",
    coupons: "/dashboard/coupons",
    customers: "/dashboard/customers",
    integrations: "/dashboard/integrations",
    settings: "/dashboard/settings",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
