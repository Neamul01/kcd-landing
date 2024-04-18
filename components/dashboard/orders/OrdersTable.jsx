"use client";

import Loader from "@/components/Shared/Loader";
import axiosInstance from "@/lib/Axios";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { toast } from "react-toastify";

const OrdersTable = ({ selectedTrack, selectedStatus }) => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(orders);

  //-------------------- Get all orders ---------------------

  const fetchOrders = async (selectedTrack, selectedStatus) => {
    setLoading(true);
    try {
      let url = `/orders?limit=${rowsPerPage}&page=${page + 1}`;

      // Append both track and status query parameters if they are provided
      if (selectedTrack && selectedStatus) {
        url += `?track=${selectedTrack}&status=${selectedStatus}`;
      } else {
        // Append only track query parameter if selectedTrack is provided
        if (selectedTrack) {
          url += `?track=${selectedTrack}`;
        }

        // Append only status query parameter if selectedStatus is provided
        if (selectedStatus) {
          url += `?status=${selectedStatus}`;
        }
      }

      const res = await axiosInstance.get(url);
      setOrders(res.data.data);
      setCount(res.data.pagination.total);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    fetchOrders(selectedTrack, selectedStatus);
  };

  //-------------------- Delete order ---------------------
  const handleDelete = async (orderId) => {
    const confirmed = window.confirm("Are you sure want to delete ?");
    if (confirmed) {
      try {
        await axiosInstance.delete(`/orders/${orderId}`);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        toast.success("Order deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedTrack, selectedStatus, page, rowsPerPage]);

  useEffect(() => {
    fetchOrders(selectedTrack, selectedStatus);
  }, [selectedTrack, selectedStatus]);

  return (
    <Card>
      <div className="flex justify-end px-9 cursor-pointer ">
        <Tooltip title="Reload" placement="top" onClick={() => handleReload()}>
          <TfiReload size={22} />
        </Tooltip>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: "800px", textAlign: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Track</TableCell>
                  <TableCell>Workshop</TableCell>
                  <TableCell>Tshirt</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>
                    <p className="flex flex-col">
                      <span>Designation/</span> <span>Student Id</span>
                    </p>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Shipping Fee</TableCell> */}
                  <TableCell>Order Items</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>
                      <span>{order.phone.number}</span>{" "}
                      <span>{order.phone.promotion}</span>
                    </TableCell>
                    <TableCell>{order.track}</TableCell>
                    <TableCell>
                      <ul
                        style={{
                          listStyleType: "circle",
                        }}
                      >
                        {order.workshop.map((workshop, index) => (
                          <li key={workshop._id}>{workshop?.title}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{order.tshirt}</TableCell>
                    <TableCell>{order.organization}</TableCell>
                    <TableCell>
                      {order.designation ? order.designation : order.studentId}
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    {/* <TableCell>{order.shippingFee}</TableCell> */}
                    <TableCell>
                      {order.orderItems.map((item, index) => (
                        <React.Fragment key={index}>
                          <div>
                            <span>Title: {item.title}</span> <br />
                            <span>Price: {item.price}</span> <br />
                            <span>
                              Discount: {item.discountPercentage}
                            </span>{" "}
                            <br />
                            <span>Total: {order.total}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </TableCell>

                    <TableCell>
                      <Button>
                        <MdDeleteOutline
                          className="text-red-500"
                          size={25}
                          onClick={() => handleDelete(order._id)}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {/* pagination implement */}
          <TablePagination
            component="div"
            count={count}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(parseInt(event.target.value))
            }
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 35, 45, 55]}
          />
        </>
      )}
    </Card>
  );
};

export default OrdersTable;
