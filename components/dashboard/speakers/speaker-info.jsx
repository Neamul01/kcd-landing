import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const speaker = {
  name: "Sofia Rivers",
  designation: "CEO",
  organization: "XYZ",
  role: "Organizer",
  sponsor_status: "",
  file: "",
};

const SpeakersInfo = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          {/* <div>
            <Avatar src={speaker.avatar} sx={{ height: "80px", width: "80px" }} />
          </div> */}
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{speaker.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {speaker.city} {speaker.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {speaker.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default SpeakersInfo;
