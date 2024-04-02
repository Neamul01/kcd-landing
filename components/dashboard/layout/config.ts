import { paths } from "@/paths";
import type { NavItemConfig } from "@/types/nav";

export const navItems = [
  {
    key: "account",
    title: "My Profile",
    href: paths.dashboard.account,
    icon: "user",
  },
  {
    key: "overview",
    title: "Overview",
    href: paths.dashboard.overview,
    icon: "chart-pie",
  },
  {
    key: "Participant",
    title: "Participant",
    href: paths.dashboard.participant,
    icon: "user",
  },
  {
    key: "Ticket",
    title: "Ticket",
    href: paths.dashboard.ticket,
    icon: "ticket",
  },
  // {
  //   key: "customers",
  //   title: "Customers",
  //   href: paths.dashboard.customers,
  //   icon: "users",
  // },
  // {
  //   key: "integrations",
  //   title: "Integrations",
  //   href: paths.dashboard.integrations,
  //   icon: "plugs-connected",
  // },
  // {
  //   key: "settings",
  //   title: "Settings",
  //   href: paths.dashboard.settings,
  //   icon: "gear-six",
  // },
] satisfies NavItemConfig[];
