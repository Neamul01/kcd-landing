"use client";

import TicketForm from "@/components/dashboard/ticket/ticketForm";
import TicketTable from "@/components/dashboard/ticket/ticketTable";
import axiosInstance from "@/lib/Axios";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
  const [responseData, setResponseData] = useState([]);
  const [tickets, setTickets] = useState([]);

  const getResData = (data) => {
    setResponseData(data);
    setTickets((prevTickets) => [...prevTickets, data]);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get("/tickets");
        setResponseData(response.data.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are sure want to delete ?");
    if (confirmed) {
      try {
        await axiosInstance.delete(`/tickets/${id}`);

        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.id !== id)
        );
        alert("Ticket deleted successfully");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting ticket:", error);
      }
    }
  };
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Ticket</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid lg={8} md={6} xs={12}>
          <TicketForm getResData={getResData} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <TicketTable tickets={responseData} onDelete={handleDelete} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
