import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { relative } from "path";
import React from "react";
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
                <div className="max-w-screen-md max-h-svh mx-auto overflow-y-scroll absolute md:top-8 top-0 left-10 right-10 bg-slate-200 p-4">
                  <div className="relative">
                    <button
                      onClick={handleClose}
                      className="text-xl font-semibold absolute -top-2 -right-3 border px-1"
                    >
                      <FaX />
                    </button>
                  </div>
                  <Typography
                    className="text-primary pb-4"
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                  >
                    {title}
                  </Typography>
                  <p className="text-xl font-medium text-secondary">
                    Speaker Details
                  </p>
                  <p className="text-gray-700">{description}</p>
                  <p className="text-xl font-medium text-secondary py-3">
                    Speaker Bio
                  </p>
                  <div className="md:flex gap-3">
                    <div className="text-center">
                      <Image
                        className="cursor-pointer"
                        height={70}
                        width={124}
                        src={speaker.photo || "/download.jpeg"}
                        alt="Speaker Photo"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-xl">{speaker.name}</p>
                      <p className="text-sm py-2">
                        {speaker.designation} At{" "}
                        <span className="text-accent">
                          {speaker.organization}
                        </span>
                      </p>
                      <Link
                        className="text-blue-500 underline"
                        target="_blank"
                        href={speaker.sponsor_link}
                      >
                        Sponsor Link
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
