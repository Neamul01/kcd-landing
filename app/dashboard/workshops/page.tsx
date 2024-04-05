import WorkshopsDetailsForm from "@/components/dashboard/workshops/WorkshopsDetailsForm";
import WorkshopsList from "@/components/dashboard/workshops/WorkshopsList";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Workshops</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid lg={8} md={6} xs={12}>
          <WorkshopsDetailsForm />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <WorkshopsList />
        </Grid>
      </Grid>
    </Stack>
  );
}
