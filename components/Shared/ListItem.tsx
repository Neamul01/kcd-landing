import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { relative } from "path";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface Speaker {
  _id: string;
  designation: string;
  name: string;
  organization: string;
  title: string;
  photo: string;
  sponsor_link: string;
}

interface Schedule {
  scheduleTime: string;
  title: string;
  description: string;
  scheduleTrack: string;
  speakers: Speaker[];
  _id: string;
  createdAt: string;
}

interface ListItemProps {
  item: Schedule;
}

export default function ListItem({ item }: ListItemProps) {
  const { scheduleTime, title, speakers, description } = item;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(item);
  return (
    <div className="px-4 py-3 border-b grid grid-cols-6">
      <div className="col-span-2 flex items-center">
        <span>{scheduleTime}</span>
      </div>
      <div className="col-span-4 flex flex-col gap-2 font-semibold">
        <p className="font-semibold">
          {title}{" "}
          {speakers.length > 0 && (
            <span
              onClick={handleOpen}
              className="text-red-500 cursor-pointer underline"
            >
              View More
            </span>
          )}
        </p>
        {speakers.map((speaker: Speaker) => (
          <>
            <p key={speaker._id} className="text-sm tracking-wide">
              <span className="text-primary font-semibold">{speaker.name}</span>
              <span className="text-orange-500 font-semibold">
                {" "}
                ({speaker.designation})
              </span>
              <span className="text-gray-600"> at {speaker.organization}</span>
            </p>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <div className="max-w-screen-md block overflow-y-scroll hide-scrollbar mx-auto py-14 px-10 absolute top-10 bottom-10 left-2 right-2 md:left-20 md:right-20 bg-gray-100 rounded-lg max-h-svh ">
                  <div className="relative">
                    <button
                      onClick={handleClose}
                      className="text-xl font-semibold absolute -top-10 -right-6 border px-1"
                    >
                      <FaX size={18} />
                    </button>
                  </div>
                  <Typography
                    className="text-primary pb-4"
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    {title}
                  </Typography>
                  <p className="text-lg font-medium text-secondary">
                    Speaker Details
                  </p>
                  <p className="text-gray-700 text-sm tracking-wide leading-6">
                    {description}
                  </p>
                  <p className="text-lg font-medium text-secondary py-3">
                    Speaker Bio
                  </p>
                  <div className="md:flex gap-3">
                    <div className="text-center rounded-lg overflow-hidden border border-primary/60 p-1">
                      <Image
                        src={speaker.photo || "/download.jpeg"}
                        height={220}
                        width={150}
                        alt="Photo Not Found!"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-lg">{speaker.name}</p>
                      <p className="text-sm py-2">
                        {speaker.designation} At{" "}
                        <span className="text-accent">
                          {speaker.organization}
                        </span>
                      </p>
                      <Link
                        className="text-primary underline"
                        target="_blank"
                        href={speaker.sponsor_link}
                      >
                        <FaLinkedinIn size={25} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </>
        ))}
      </div>
    </div>
  );
}
