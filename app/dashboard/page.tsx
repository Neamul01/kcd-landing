import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Unstable_Grid2";

import { config } from "@/config";
import { Stack, Typography } from "@mui/material";
import { AccountInfo } from "@/components/dashboard/account/account-info";
import { AccountDetailsForm } from "@/components/dashboard/account/account-details-form";

export const metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">My Profile</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
