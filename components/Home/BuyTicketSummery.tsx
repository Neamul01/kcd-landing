"use client";
import { useUser } from "@/hooks/use-user";
import axiosInstance from "@/lib/Axios";
import { useDetailsStore } from "@/store/useDetailsStore";
import { Order, Ticket } from "@/types/types";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { TbCurrencyTaka } from "react-icons/tb";

export default function BuyTicketSummery({
  setTab,
  tab,
  selectedTickets,
}: {
  setTab: Dispatch<SetStateAction<number>>;
  tab: number;
  selectedTickets: Ticket | undefined;
}) {
  const { data: user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { data, setIsSubmit, errors } = useDetailsStore();

  const makeOrder = async (orderData: Order) => {
    try {
      setLoading(true);
      await axiosInstance.post("/orders", orderData).then((res) => {
        console.log("order placed", res.data.data._id);
        setOrderId(res.data.data._id);
      });
    } catch {
      () => alert("something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("store data", data);
    // @ts-ignore
    makeOrder(data);
    setTab(tab + 1);
  }, [data]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await axiosInstance.get(`/orders/payment/${orderId}`).then((res) => {
        console.log("res", res);
        // window.location.href=''
      });
    } catch {
      () => alert("something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    try {
      // setLoading(true);
      if (tab === 1) {
        setTab(tab + 1);
      } else {
        setTab(tab);
      }

      if (tab === 2) {
        setIsSubmit(true);
      }
      if (tab === 3) {
        handleCheckout();
      }

      console.log("store errors", errors);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 w-full h-full p-4">
      <div className="h-full w-full flex flex-col justify-between gap-3">
        {selectedTickets ? (
          <div className="w-full  bg-white flex gap-4 flex-col rounded-xl p-4">
            <h3 className="font-semibold text-xl tracking-wide">
              Ticket Summary
            </h3>
            <div className="flex flex-col gap-2 pb-2">
              <div className="flex justify-between text-black/60">
                <p className="font-medium">
                  {selectedTickets.title.length > 20
                    ? selectedTickets.title.slice(0, 20) + "..."
                    : selectedTickets.title}
                </p>
                {/* <p className="">x{ticketQuantity}</p> */}
                <p className="font-medium flex items-center justify-center">
                  <TbCurrencyTaka /> {selectedTickets.price}{" "}
                </p>
              </div>
              <div className="flex justify-between text-black/60">
                <p className="">Sub Total</p>
                <p className="font-medium flex items-center justify-center">
                  <TbCurrencyTaka /> {selectedTickets.price}{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-between text-black text-xl font-semibold py-3 border-y border-gray-200">
              <p className="">Total</p>
              <p className="font-medium flex items-center justify-center">
                <TbCurrencyTaka /> {selectedTickets.price}{" "}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-accent/80 text-center text-xs font-[300] tracking-wide px-5">
                Processing Fee will be added on selecting payment method*
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-72 bg-white flex gap-4 flex-col items-center justify-center rounded-xl">
            <HiMiniShoppingCart size={80} className="text-accent/20" />
            <p className="text-center px-6">
              You haven&apos;t selected any ticket. Select a ticket to see the
              ticket summary.
            </p>
          </div>
        )}
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <div className="flex flex-col justify-center gap-1">
              <p className="font-medium">Apply Coupon</p>
              <TextField
                id="outlined-error"
                placeholder="Enter Code"
                size="small"
                className="bg-white border-none focus:ring-amber-600"
              />
            </div>
            <div className="mt-auto ">
              <Button
                variant="outlined"
                size="medium"
                className="border-accent/50 border-2"
              >
                <span className="text-accent/60 capitalize">Apply</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          {user ? (
            <Button
              onClick={handleProceed}
              disabled={!selectedTickets || loading}
              variant="contained"
              size="large"
              className="w-full bg-accent/60 hover:bg-accent/80 disabled:bg-accent/40 !disabled:cursor-not-allowed  py-3 shadow-none"
            >
              <span className="text-lg capitalize font-bold text-white">
                {loading
                  ? "Loading..."
                  : tab === 2
                    ? "Checkout"
                    : tab === 3
                      ? "Proceed to checkout"
                      : "Proceed"}
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/auth/sign-in")}
              // disabled
              variant="outlined"
              size="large"
              className="w-full  disabled:bg-accent/40 !disabled:cursor-not-allowed border-accent  py-3 shadow-none"
            >
              <span className="text-lg capitalize font-bold text-black">
                Sign In
              </span>
            </Button>
          )}
        </div>
        {tab === 3 && (
          <p className="text-sm text-center text-black/60">
            By registering for this event, you provide consent to share your
            contact information with the event organisers to share the event and
            other updates with you by email, mobile & WhatsApp. You understand
            and accept that you will abide by the KCD Dhaka{" "}
            <Link
              href={"/conditions/refund-policy"}
              className="text-primary underline"
            >
              refund policy
            </Link>{" "}
            and{" "}
            <Link
              href={"/conditions/terms-condition"}
              className="text-primary underline"
            >
              Terms and Conditions.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
