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
    workshops: "/dashboard/workshops",
    orders: "/dashboard/orders",
    customers: "/dashboard/customers",
    integrations: "/dashboard/integrations",
    settings: "/dashboard/settings",
    raffleDraw: "/dashboard/raffle-draw",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
