import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageGallery() {
  return (
    <Box sx={{}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
    img: "https://kcdkerala.in/images/venue/l14.jpeg",
    title: "Bed",
  },
  {
    img: "https://kcdkerala.in/images/venue/l1.jpeg",
    title: "Books",
  },
  {
    img: "https://kcdkerala.in/images/venue/l2.jpeg",
    title: "Sink",
  },
  {
    img: "https://kcdkerala.in/images/venue/l3.jpeg",
    title: "Kitchen",
  },
  {
    img: "https://kcdkerala.in/images/venue/l4.jpeg",
    title: "Blinds",
  },
  {
    img: "https://kcdkerala.in/images/venue/l5.jpeg",
    title: "Chairs",
  },
  {
    img: "https://kcdkerala.in/images/venue/l8.jpeg",
    title: "Laptop",
  },
  {
    img: "https://kcdkerala.in/images/venue/l7.jpeg",
    title: "Doors",
  },
  {
    img: "https://kcdkerala.in/images/venue/l6.jpeg",
    title: "Coffee",
  },
];
