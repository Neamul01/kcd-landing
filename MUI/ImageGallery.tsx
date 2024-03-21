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
    img: "https://www.bracinn.com/images/homeslides/slide04.jpg",
    title: "Bed",
  },
  {
    img: "https://www.bracinn.com/images/meetings/auditorium.jpg",
    title: "Sink",
  },
  {
    img: "https://www.bracinn.com/images/meetings/meet02.jpg",
    title: "Kitchen",
  },
  {
    img: "https://www.bracinn.com/images/homeslides/slide07.jpg",
    title: "Blinds",
  },
  {
    img: "https://www.bracinn.com/images/homeslides/slide06.jpg",
    title: "Chairs",
  },
  {
    img: "https://www.bracinn.com/images/homeslides/slide08.jpg",
    title: "Books",
  },
];
