"use client";

import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

import { config } from "@/config";
import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
import axiosInstance from "@/lib/Axios";
import { Participant, ParticipantsTable } from "./ParticipantsTable";

export const metadata = {
  title: `Customers | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function ParticipantsList() {
  const page = 0;
  const rowsPerPage = 5;
  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [selectedRole, setSelectedRole] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const paginatedCustomers = applyPagination(participants, page, rowsPerPage);

  const fetchParticipants = async (role?: string) => {
    try {
      setLoading(true);

      const url = role ? `/participants?role=${role}` : "/participants";

      const response = await axiosInstance.get(url);

      const formattedData: Participant[] = response.data.data.map(
        (participant: Participant) => ({
          id: participant._id,
          name: participant.name,
          avatar: participant.photo, // Add avatar field if available
          organization: participant.organization, // Add city field if available
          designation: participant.designation, // Add country field if available
          role: participant.role, // Add state field if available
          sponsor_status: participant.sponsor_status, // Add street field if available
          createdAt: dayjs(participant.createdAt).toDate(),
        })
      );

      // console.log("participants", response.data.data);
      // console.log("formattedData", formattedData);
      setParticipants(formattedData);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    if (selectedRole) {
      fetchParticipants(selectedRole);
      console.log("selected role", selectedRole);
    } else {
      fetchParticipants();
    }
  };

  React.useEffect(() => {
    fetchParticipants();
  }, []);

  React.useEffect(() => {
    if (selectedRole) {
      fetchParticipants(selectedRole);
      console.log("selected role", selectedRole);
    } else {
      fetchParticipants();
    }
  }, [selectedRole]);

  return (
    <Stack spacing={3}>
      <CustomersFilters
        setSelectedRole={setSelectedRole}
        selectedRole={selectedRole}
      />
      <ParticipantsTable
        handleReload={handleReload}
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
