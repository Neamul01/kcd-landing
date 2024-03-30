"use client";

import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

import { config } from "@/config";
import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
import type { Customer } from "@/components/dashboard/customer/customers-table";
import axiosInstance from "@/lib/Axios";
import { Participant, ParticipantsTable } from "./ParticipantsTable";

export const metadata = {
  title: `Customers | Dashboard | ${config.site.name}`,
} satisfies Metadata;

type ApiResponseData = {
  _id: string;
  name: string;
  email: string;
  designation: string;
  organization: string;
  role: string;
  createdAt: string;
  photo: string;
  sponsor_status: string;
};

export default function ParticipantsList() {
  const page = 0;
  const rowsPerPage = 5;
  const [participants, setParticipants] = React.useState<Participant[]>([]);

  const paginatedCustomers = applyPagination(participants, page, rowsPerPage);

  React.useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axiosInstance.get("/participants");

      const formattedData: Participant[] = response.data.data.map(
        (participant: ApiResponseData) => ({
          id: participant._id,
          name: participant.name,
          avatar: participant.photo, // Add avatar field if available
          email: participant.email,
          organization: participant.organization, // Add city field if available
          designation: participant.designation, // Add country field if available
          role: participant.role, // Add state field if available
          sponsor_status: participant.sponsor_status, // Add street field if available
          createdAt: dayjs(participant.createdAt).toDate(),
        })
      );

      console.log("participants", response.data.data);
      console.log("formattedData", formattedData);
      setParticipants(formattedData);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  return (
    <Stack spacing={3}>
      {/* <Stack direction="row" spacing={3}>
        <div className="ml-auto w-full flex justify-end">
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack> */}
      <CustomersFilters />
      <ParticipantsTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}
function applyPagination(
  rows: Participant[],
  page: number,
  rowsPerPage: number
): Participant[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
