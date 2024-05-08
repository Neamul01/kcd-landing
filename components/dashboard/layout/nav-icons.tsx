import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ChartPie as ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnected as PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { Tag as TagIcon } from "@phosphor-icons/react/dist/ssr/Tag";
import { Ticket as TicketIcon } from "@phosphor-icons/react/dist/ssr/Ticket";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { Record as OrderIcon } from "@phosphor-icons/react/dist/ssr/Record";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";
import { Gift } from "@phosphor-icons/react/dist/ssr/Gift";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr/CalendarCheck";
import { Lightbulb } from "@phosphor-icons/react/dist/ssr/Lightbulb";

export const navIcons = {
  "chart-pie": ChartPieIcon,
  "gear-six": GearSixIcon,
  "plugs-connected": PlugsConnectedIcon,
  "x-square": XSquare,
  user: UserIcon,
  users: UsersIcon,
  ticket: TicketIcon,
  coupon: TagIcon,
  orders: OrderIcon,
  raffleDraw: Gift,
  schedule: CalendarCheck,
  workshops: Lightbulb,
} as Record<string, Icon>;
