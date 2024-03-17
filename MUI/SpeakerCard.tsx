import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type Speaker = {
  id: number;
  name: string;
  industry: string;
  position: string;
  imageUrl: string;
};
export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="bg-transparent shadow-none hover:bg-transparent"
    >
      <CardActionArea>
        <CardMedia
          component="img"
          className="rounded-xl bg-transparent w-[200px] h-[216px] "
          image={speaker.imageUrl}
          alt="green iguana"
        />
        <CardContent className="max-w-[200px] px-1">
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className="font-bold text-base text-center"
          >
            {speaker.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-center leading-8 text-base tracking-wider"
          >
            {speaker.industry}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-center text-sm mt-3"
          >
            {speaker.position}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
