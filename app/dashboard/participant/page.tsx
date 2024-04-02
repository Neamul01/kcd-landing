import ParticipantsList from "@/components/dashboard/speakers/ParticipantsList";
import SpeakersDetailsForm from "@/components/dashboard/speakers/speakersDetailsForm";
import { Grid, Stack, Typography } from "@mui/material";

const page = () => {
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Participant</Typography>
      </div>
      <Grid container spacing={2}>
        {/* <Grid lg={4} md={6} xs={12}>
          <SpeakersInfo />
        </Grid> */}
        <Grid lg={8} md={6} xs={12}>
          <SpeakersDetailsForm />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <ParticipantsList />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default page;
