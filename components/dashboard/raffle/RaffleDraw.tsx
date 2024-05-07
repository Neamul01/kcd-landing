"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/Axios";
import { toast } from "react-toastify";
import ReactConfetti from "react-confetti";

type RaffleWinner = {
  _id: string;
  name: string;
  email: string;
  organization: string;
  designation: string;
};

export default function RaffleDraw() {
  const [raffleWinner, setRaffleWinner] = useState<RaffleWinner>();
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [success, setSuccess] = useState(false);

  const detectSize = () => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dimension]);

  const handleRaffleDraw = async () => {
    let timeoutId: any;

    try {
      setSuccess(true);
      // Clear previous timeout if exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Reset success after 5 seconds
      timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 4000);

      await axiosInstance
        .get("/orders/raffle-draw")
        .then((response) => {
          // console.log("fellowships", response.data.data);
          setRaffleWinner(response.data.data);
          console.log("winner", response.data.data);
        })
        .catch((err) => {
          toast.error("Error Raffle Draw, Please try again.");
          //   clearTimeout(timeoutId);
        });
    } catch (error) {
      console.error(error);
      //   clearTimeout(timeoutId);
    }
  };

  return (
    <div className="w-full h-[60vh] flex items-center justify-center flex-col">
      <Button variant="contained" size="large">
        <span className="capitalize" onClick={handleRaffleDraw}>
          Draw
        </span>
      </Button>
      {raffleWinner && (
        <div className="border-[1px] rounded-lg p-3 mt-2 font-playfair">
          <div className="border-2 py-5 pt-14 w-[500px] px-5 border-black/90 rounded-lg relative">
            <div className="absolute left-2 top-1">
              <Image src={"/KCDLogoB.png"} height={100} width={80} alt="logo" />
            </div>

            <h3 className="uppercase text-center text-4xl font-semibold tracking-wider font-playfair ">
              Raffle Ticket
            </h3>
            <p className="text-center font-medium text-xl text-accent">
              {raffleWinner?._id}
            </p>
            <p className="flex gap-2 items-center justify-center">
              <span>{raffleWinner?.name}</span> -{" "}
              <span>{raffleWinner?.designation}</span>
            </p>
            <p className="text-center text-sm">{raffleWinner?.organization}</p>
            <p className="text-center text-sm">{raffleWinner?.email}</p>
          </div>
        </div>
      )}

      {success && (
        <ReactConfetti
          width={dimension.width}
          height={dimension.height}
          //   tweenDuration={1000}
        />
      )}
    </div>
  );
}
