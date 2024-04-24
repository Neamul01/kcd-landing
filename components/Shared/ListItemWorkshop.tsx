import { Workshop } from "@/types/types";
import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Participant } from "../dashboard/speakers/ParticipantsTable";

interface ListItemProps {
  item: Workshop;
}

export default function ListItemWorkshop({ item }: ListItemProps) {
  const { title, speakers, description, level } = item;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(item);
  return (
    <div className="px-4 py-3 border-b grid grid-cols-6">
      <div className="col-span-2 flex items-center">
        <span className="capitalize">{level}</span>
      </div>
      <div className="col-span-4 flex flex-col gap-2 font-semibold">
        <div>
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
          {speakers &&
            speakers.map((speaker: Participant) => (
              <>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box>
                    <div className="max-w-screen-md max-h-svh mx-auto overflow-y-scroll absolute md:top-8 top-0 left-10 right-10 bg-slate-100 hide-scrollbar rounded-lg px-8 py-6">
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
                        variant="h5"
                        component="h2"
                      >
                        {title}
                      </Typography>
                      <p className="text-lg font-medium text-secondary">
                        Details
                      </p>
                      <p className="text-gray-700 text-sm">{description}</p>
                      <p className="text-lg font-medium text-secondary py-3">
                        Speakers
                      </p>
                      {speakers.map((profile, i) => (
                        <div
                          key={profile._id + i}
                          className="md:flex gap-3 py-3"
                        >
                          <div className="text-center rounded-lg overflow-hidden border border-primary/60 p-1">
                            <Image
                              src={
                                profile.photo
                                  ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${profile.photo}`
                                  : "/download.jpeg"
                              }
                              height={220}
                              width={150}
                              alt="Photo Not Found!"
                            />
                          </div>
                          <div className="col-span-2">
                            <p className="font-medium text-lg">
                              {profile.name}
                            </p>
                            <p className="text-sm py-2">
                              {profile.designation} At{" "}
                              <span className="text-accent">
                                {profile.organization}
                              </span>
                            </p>
                            <Link
                              className="text-primary underline"
                              target="_blank"
                              href={profile.sponsor_link}
                            >
                              <FaLinkedinIn size={25} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Box>
                </Modal>
              </>
            ))}
        </div>
        <p className="font-normal text-sm">{description}</p>
      </div>
    </div>
  );
}
