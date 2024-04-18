"use client";

import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

import { config } from "@/config";
import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
import axiosInstance from "@/lib/Axios";
import { Workshop, WorkshopsTable } from "./WorkshopsTable";
import Loader from "@/components/Shared/Loader";

export const metadata = {
  title: `Customers | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function WorkshopsList() {
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [participants, setParticipants] = React.useState<Workshop[]>([]);
  const [selectedRole, setSelectedRole] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  // const paginatedCustomers = applyPagination(participants, page, rowsPerPage);

  const fetchParticipants = async (
    role?: string,
    rowsPerPage: number = 10,
    page = 0
  ) => {
    try {
      setLoading(true);

      let url = `/workshops?limit=${rowsPerPage}&page${page + 1}`;

      if (role) {
        url += `&role=${role}`;
      }

      const response = await axiosInstance.get(url);

      const formattedData: Workshop[] = response.data.data.map(
        (participant: Workshop) => participant
      );

      setCount(response.data.pagination.total);
      // console.log("participants", response.data.pagination.total);
      // console.log("formattedData", formattedData);
      setParticipants(formattedData);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {}, [rowsPerPage]);

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
      fetchParticipants(selectedRole, rowsPerPage, page);
    } else if (rowsPerPage) {
      fetchParticipants(undefined, rowsPerPage, page);
    } else {
      fetchParticipants(undefined, undefined, page);
    }
  }, [selectedRole, rowsPerPage, page]);

  return (
    <Stack spacing={3}>
      <CustomersFilters
        setSelectedRole={setSelectedRole}
        selectedRole={selectedRole}
      />
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <WorkshopsTable
          handleReload={handleReload}
          count={count}
          page={page}
          setPage={setPage}
          rows={participants}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </Stack>
  );
}
// function applyPagination(
//   rows: Workshop[],
//   page: number,
//   rowsPerPage: number
// ): Workshop[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
