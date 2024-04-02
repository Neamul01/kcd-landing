"use client";

import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

import { config } from "@/config";
import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
import axiosInstance from "@/lib/Axios";
import Loader from "@/components/Shared/Loader";
import OrdersTable, { Orders } from "./OrdersTable";

export const metadata = {
  title: `Customers | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function OrdersList() {
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [participants, setParticipants] = React.useState<Orders[]>([]);
  const [selectedRole, setSelectedRole] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const paginatedCustomers = applyPagination(participants, page, rowsPerPage);

  const fetchParticipants = async (
    role?: string,
    rowsPerPage: number = 25,
    page = 0
  ) => {
    try {
      setLoading(true);

      let url = `/participants?limit=${rowsPerPage}&page=${page + 1}`;

      if (role) {
        url += `&role=${role}`;
      }

      const response = await axiosInstance.get(url);

      const formattedData: Orders[] = response.data.data.map(
        (participant: Orders) => participant
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
        <OrdersTable
          handleReload={handleReload}
          count={count}
          page={page}
          setPage={setPage}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </Stack>
  );
}
function applyPagination(
  rows: Orders[],
  page: number,
  rowsPerPage: number
): Orders[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
