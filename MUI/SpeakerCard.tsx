import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

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
      className="bg-transparent shadow-none hover:bg-transparent mx-auto"
    >
      <CardActionArea className="hover:bg-transparent pt-3">
        <CardMedia
          component="img"
          className="rounded-xl bg-transparent w-[160px] h-[216px] mx-auto "
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
          <a
            href="#"
            className="text-blue-600 flex items-center justify-center mt-2"
          >
            <FaLinkedinIn size={25} />
          </a>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
