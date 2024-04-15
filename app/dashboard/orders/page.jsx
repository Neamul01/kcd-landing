"use client";

import { Discounts } from "@/components/dashboard/orders/Discounts";
import { NumberOfSales } from "@/components/dashboard/orders/NumberOfSales";
import { OrderFilter } from "@/components/dashboard/orders/OrderFilter";
import OrdersTable from "@/components/dashboard/orders/OrdersTable";
import { Revenue } from "@/components/dashboard/orders/Revenue";
import { TotalSales } from "@/components/dashboard/orders/TotalSales";
import axiosInstance from "@/lib/Axios";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
  const [orderSummery, setOrderSummery] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchOrderSummery();
  }, []);

  const fetchOrderSummery = async () => {
    try {
      const res = await axiosInstance.get("/orders/summary");
      setOrderSummery(res.data.data);
      console.log("order summery", res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Orders</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <div className="flex gap-6 mb-10 items-center w-full">
            <Grid lg={3} sm={6} xs={12}>
              <NumberOfSales
                // key={item}
                diff={12}
                trend="up"
                sx={{ height: "100%" }}
                value={orderSummery.numSales}
              />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
              <TotalSales
                // key={item}
                diff={12}
                trend="up"
                sx={{ height: "100%" }}
                value={orderSummery.totalSales}
              />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
              <Discounts
                // key={item}
                diff={12}
                trend="up"
                sx={{ height: "100%" }}
                value={orderSummery.discounts}
              />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
              <Revenue
                // key={item}
                diff={12}
                trend="up"
                sx={{ height: "100%" }}
                value={orderSummery.revenue}
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <OrderFilter
            setSelectedTrack={setSelectedTrack}
            selectedTrack={selectedTrack}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <OrdersTable
            selectedTrack={selectedTrack}
            selectedStatus={selectedStatus}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
