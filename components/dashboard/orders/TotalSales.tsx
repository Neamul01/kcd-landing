import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BiSolidDoughnutChart } from "react-icons/bi";

export interface TotalSalesProps {
  diff?: number;
  trend: "up" | "down";
  sx?: SxProps;
  value: string;
}

export function TotalSales({
  diff,
  trend,
  sx,
  value,
}: TotalSalesProps): React.JSX.Element {
  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColor =
    trend === "up"
      ? "var(--mui-palette-success-main)"
      : "var(--mui-palette-error-main)";

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total Sales
              </Typography>
              <Typography variant="h4" className="flex items-center">
                <FaBangladeshiTakaSign size={20} />
                {value}
              </Typography>
            </Stack>
            <Avatar
              className="!bg-primary"
              sx={{
                height: "56px",
                width: "56px",
              }}
            >
              <BiSolidDoughnutChart size={25} className="text-white" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}