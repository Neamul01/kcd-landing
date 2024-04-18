"use client";

import CouponDetailsForm from "@/components/dashboard/coupons/CouponDetailsFrom";
import CouponTable from "@/components/dashboard/coupons/CouponTable";
import axiosInstance from "@/lib/Axios";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [responseData, setResponseData] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // console.log(responseData);

  const getResData = (data) => {
    setResponseData(data);
    setCoupons((prevCoupons) => [...prevCoupons, data]);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  //  Get All coupons
  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.get("/coupons");
      setResponseData(response.data.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };
  const handleReload = () => {
    fetchCoupons();
  };

  //  Handle Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        await axiosInstance.delete(`/coupons/${id}`);
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon._id !== id)
        );
        toast.success("Coupon deleted successfully");
      } catch (error) {
        console.error("Error deleting coupon:", error);
        toast.error("Error deleting coupon. Please try again.");
      }
    }
  };

  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Coupon</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid lg={8} md={6} xs={12}>
          {/* <CouponForm getResData={getResData} handleReload={handleReload} /> */}
          <CouponDetailsForm />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <CouponTable
            coupons={responseData}
            onDelete={handleDelete}
            handleReload={handleReload}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
