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
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://www.bracinn.com/images/gallery/auditorium-02.jpg",
    title: "hall 1",
  },
  {
    img: "https://www.bracinn.com/images/gallery/bracinn-meeting-room-2.jpg",
    title: "meeting room 1",
  },
  {
    img: "https://www.bracinn.com/images/gallery/meeting-room-3.jpg",
    title: "meeting room 3",
  },
  {
    img: "https://www.bracinn.com/images/gallery/banqueting-hall-02.jpg",
    title: "banqueting hall",
  },
  {
    img: "https://www.bracinn.com/images/gallery/restaurant.jpg",
    title: "restaurant",
  },
  {
    img: "https://www.bracinn.com/images/gallery/reception.jpg",
    title: "reception",
  },
  {
    img: "https://www.bracinn.com/images/gallery/bracinn-meeting-room-3.jpg",
    title: "bracinn meeting room 3",
  },
  {
    img: "https://www.bracinn.com/images/gallery/auditorium-01.jpg",
    title: "Bed",
  },
  {
    img: "https://www.bracinn.com/images/gallery/the-bracinn-conference-hall.jpg",
    title: "Sink",
  },
  {
    img: "https://www.bracinn.com/images/gallery/banqueting-hall-01.jpg",
    title: "Blinds",
  },
  {
    img: "https://www.bracinn.com/images/gallery/meeting-room-1.jpg",
    title: "Chairs",
  },
  {
    img: "https://www.bracinn.com/images/gallery/lobby.jpg",
    title: "Books",
  },
];
