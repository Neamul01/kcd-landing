import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

export default function ImageGallery() {
  return (
    <Box sx={{}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <Image
              height={233}
              width={350}
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:..."
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "/venue/auditorium-01.jpg",
    title: "auditorium-01",
  },
  {
    img: "/venue/auditorium-02.jpg",
    title: "auditorium-02",
  },
  {
    img: "/venue/banqueting-hall-01.jpg",
    title: "banqueting-hall-01",
  },
  {
    img: "/venue/banqueting-hall-02.jpg",
    title: "banqueting hall 02",
  },
  {
    img: "/venue/bracinn-meeting-room-2.jpg",
    title: "bracinn-meeting-room-2",
  },
  {
    img: "/venue/bracinn-meeting-room-3.jpg",
    title: "bracinn-meeting-room-3",
  },
  {
    img: "/venue/lobby.jpg",
    title: "lobby",
  },
  {
    img: "/venue/meeting-room-1.jpg",
    title: "meeting-room-1",
  },
  {
    img: "/venue/meeting-room-3.jpg",
    title: "meeting-room-3",
  },
  {
    img: "/venue/reception.jpg",
    title: "reception",
  },
  {
    img: "/venue/restaurant.jpg",
    title: "restaurant",
  },
  {
    img: "/venue/the-bracinn-conference-hall.jpg",
    title: "the-bracinn-conference-hall",
  },
];
