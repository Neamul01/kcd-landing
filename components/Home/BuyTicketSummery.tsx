"use client";
import { useUser } from "@/hooks/use-user";
import axiosInstance from "@/lib/Axios";
import { useDetailsStore } from "@/store/useDetailsStore";
import { Coupon, Order, Ticket, TicketSummery } from "@/types/types";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "react-toastify";

export default function BuyTicketSummery({
  setTab,
  tab,
  selectedTickets,
  ticketSummary,
  setTicketSummary,
}: {
  setTab: Dispatch<SetStateAction<number>>;
  tab: number;
  selectedTickets: Ticket | undefined;
  ticketSummary: TicketSummery;
  setTicketSummary: Dispatch<SetStateAction<TicketSummery>>;
}) {
  // const { data: user } = useUser();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [coupon, setCoupon] = useState("");
  const { data, setIsSubmit, errors, setErrors, clearErrors } =
    useDetailsStore();

  const makeOrder = async (orderData: Order) => {
    try {
      setLoading(true);
      clearErrors();
      const response = await axiosInstance.post("/orders", orderData);
      // console.log("order placed", response.data.data._id);
      setOrderId(response.data.data._id);
      setLoading(false);
      return null;
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.error);
      setErrors(err.response.data.error);
      console.log("make order error", err.response.data.error);
      return err.response.data.error;
    }
  };

  // make order (tab-2) --------------------------------------
  useEffect(() => {
    if (data.address) {
      setLoading(true);
      makeOrder(data)
        .then((error) => {
          if (error) {
            console.log("Error encountered, cannot proceed to the next tab.");
          } else {
            setTab(tab + 1);
          }
        })
        .catch(() => {
          toast.error("Something went wrong, please try again");
        });
    }
  }, [data]);

  // checkout (tab-3) --------------------------------------
  const handleCheckout = async () => {
    try {
      setLoading(true);
      await axiosInstance.get(`/orders/payment/${orderId}`).then((res) => {
        console.log("res", res.data.data.payment_url);
        window.location.href = res.data.data.payment_url;
      });
    } catch {
      () => toast.error("something went wrong, please try again");
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

  // coupon ---------------------------------
  const handleApplyCoupon = async () => {
    try {
      if (!coupon) {
        return toast.error("Please enter a coupon");
      }

      if (!selectedTickets) {
        return toast.error("Please select a ticket first.");
      }

      const couponDetails = await axiosInstance
        .get(`coupons/apply/${coupon}/${selectedTickets?._id}`)
        .then((res) => res.data.data)
        .catch((err) => {
          toast.error(err.response.data.error);
        });

      console.log("response", couponDetails);

      if (!couponDetails.isAvailable) {
        return toast.error("This ticket is expired.");
      }

      // Update state
      setTicketSummary({
        ...ticketSummary,
        price: Number(selectedTickets.price),
        discount: couponDetails.discountPercentage,
        subTotal:
          Number(selectedTickets.price) +
          Number(couponDetails.discountPercentage),
        total:
          Number(selectedTickets.price) +
          Number(couponDetails.discountPercentage),
      });
    } catch {
      (err: any) => {
        toast.error(
          "An error occurred while applying the coupon. Please try again."
        );
        console.log(err);
      };
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
                  <TbCurrencyTaka /> {ticketSummary.price}{" "}
                </p>
              </div>
              <div className="flex justify-between text-black/60">
                <p className="">Sub Total</p>
                <p className="font-medium flex items-center justify-center">
                  <TbCurrencyTaka /> {ticketSummary.subTotal}{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-between text-black text-xl font-semibold py-3 border-y border-gray-200">
              <p className="">Total</p>
              <p className="font-medium flex items-center justify-center">
                <TbCurrencyTaka /> {ticketSummary.total}{" "}
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
                onChange={(e) => setCoupon(e.target.value)}
                className="bg-white border-none focus:ring-amber-600"
              />
            </div>
            <div className="mt-auto ">
              <Button
                variant="outlined"
                size="medium"
                disabled={!selectedTickets}
                onClick={handleApplyCoupon}
                className="border-accent/50 border-2"
              >
                <span className="text-accent/60 capitalize">Apply</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          {/* {user ? ( */}
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
          {/* // ) : (
          //   <Button
          //     onClick={() => router.push("/auth/sign-in")}
          //     // disabled
          //     variant="outlined"
          //     size="large"
          //     className="w-full  disabled:bg-accent/40 !disabled:cursor-not-allowed border-accent  py-3 shadow-none"
          //   >
          //     <span className="text-lg capitalize font-bold text-black">
          //       Sign In
          //     </span>
          //   </Button>
          // )} */}
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
