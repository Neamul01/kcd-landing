"use client";
import { useUser } from "@/hooks/use-user";
import axiosInstance from "@/lib/Axios";
import { useDetailsStore } from "@/store/useDetailsStore";
import { useTimerStore } from "@/store/useTimerStore";
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
  const [order, setOrder] = useState<Order>();
  const [coupon, setCoupon] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const { data, setIsSubmit, errors, setErrors, clearErrors } =
    useDetailsStore();
  const { timeLeft, timerFinished, startTimer, formatTime } = useTimerStore();

  const router = useRouter();

  const makeOrder = async (orderData: Order) => {
    try {
      setLoading(true);
      clearErrors();
      const orderUrl = coupon ? `/orders?coupon=${coupon}` : `/orders`;
      const response = await axiosInstance.post(orderUrl, orderData);
      console.log("order placed", response.data.data);
      setOrder(response.data.data);
      setLoading(false);
      startTimer();
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
    console.log("-------------------submit errors", errors);
    if (data.name) {
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
      if (order && order?.total <= 0) {
        // Handle case when total is 0
        const response = await axiosInstance.get(
          `/orders/payment/${order?._id}`
        );
        const htmlContent = response.data;
        router.push(`/render?content=${encodeURIComponent(htmlContent)}`);
      } else {
        // Case when total is greater than 0, redirect to payment URL
        const response = await axiosInstance.get(
          `/orders/payment/${order?._id}`
        );
        const paymentUrl = response.data.data.payment_url;
        window.location.href = paymentUrl;
      }
    } catch {
      toast.error("Something went wrong, please try again");
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
      // Calculate discounted price
      const discountPercentage = couponDetails.discountPercentage;
      const originalPrice = Number(selectedTickets.price);
      const discountedPrice =
        originalPrice - (discountPercentage / 100) * originalPrice;

      setTicketSummary({
        ...ticketSummary,
        price: originalPrice,
        discount: discountPercentage,
        subTotal: discountedPrice,
        total: discountedPrice,
      });
      // setCoupon("");
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
            <div className="">
              {timeLeft && !timerFinished && (
                <div className="flex flex-col items-center justify-center border rounded-lg py-3">
                  <>
                    <p className="text-center font-medium text-2xl text-accent">
                      {formatTime(timeLeft as number)}
                    </p>
                    <p className="text-center text-xs">
                      Please make payment within this time.
                    </p>
                  </>
                </div>
              )}
              {timerFinished && (
                <p className="text-center text-sm text-accent">
                  Time left, please buy ticket again.
                </p>
              )}
            </div>
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
              <div className="flex justify-between text-black/60 text-sm">
                <p className="">Discount</p>
                <p className="font-medium flex items-center justify-center">
                  {ticketSummary.discount}%
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
                value={coupon}
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
            disabled={!selectedTickets || loading || timerFinished}
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
