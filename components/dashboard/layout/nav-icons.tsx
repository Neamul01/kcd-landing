import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ChartPie as ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnected as PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { Ticket as TicketIcon } from "@phosphor-icons/react/dist/ssr/Ticket";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { Record as OrderIcon } from "@phosphor-icons/react/dist/ssr/Record";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";

export const navIcons = {
  "chart-pie": ChartPieIcon,
  "gear-six": GearSixIcon,
  "plugs-connected": PlugsConnectedIcon,
  "x-square": XSquare,
  user: UserIcon,
  users: UsersIcon,
  ticket: TicketIcon,
  orders: OrderIcon,
} as Record<string, Icon>;
