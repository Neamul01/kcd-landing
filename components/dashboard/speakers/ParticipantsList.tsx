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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [selectedRole, setSelectedRole] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const paginatedCustomers = applyPagination(participants, page, rowsPerPage);

  const fetchParticipants = async (role?: string, rowsPerPage: number = 10) => {
    try {
      setLoading(true);

      const url = role
        ? `/participants?role=${role}?limit=${rowsPerPage}`
        : `/participants?limit=${rowsPerPage}`;

      const response = await axiosInstance.get(url);

      const formattedData: Participant[] = response.data.data.map(
        (participant: Participant) => participant
      );

      // setPage(response.data.pagination.next.page);
      console.log("participants", response.data);
      // console.log("formattedData", formattedData);
      setParticipants(formattedData);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("rowsPerPage", rowsPerPage);
  }, [rowsPerPage]);

  const handleReload = () => {
    if (selectedRole) {
      fetchParticipants(selectedRole, rowsPerPage);
    } else {
      fetchParticipants();
    }
  };

  React.useEffect(() => {
    fetchParticipants();
  }, []);

  React.useEffect(() => {
    if (selectedRole) {
      fetchParticipants(selectedRole, rowsPerPage);
      // console.log("selected role", selectedRole);
    } else if (rowsPerPage) {
      // fetchParticipants();
    }
  }, [selectedRole, rowsPerPage]);

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
        setRowsPerPage={setRowsPerPage}
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
