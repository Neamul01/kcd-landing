import ScheduleDetailsForm from "@/components/dashboard/schedules/ScheduleDetailsForm";
import ScheduleList from "@/components/dashboard/schedules/ScheduleList";
import ParticipantsList from "@/components/dashboard/speakers/ParticipantsList";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Schedules</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid lg={8} md={6} xs={12}>
          <ScheduleDetailsForm />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <ScheduleList />
        </Grid>
      </Grid>
    </Stack>
  );
}
