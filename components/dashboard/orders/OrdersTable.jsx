"use client";

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
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { toast } from "react-toastify";

const OrdersTable = ({ selectedTrack, selectedStatus }) => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  //-------------------- Get all orders ---------------------

  const fetchOrders = async (selectedTrack, selectedStatus) => {
    try {
      let url = "/orders";

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
    } catch (error) {
      console.error("Error fetching orders:", error);
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
  }, []);

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
                        <span>Discount: {item.discountPercentage}</span> <br />
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
    </Card>
  );
};

export default OrdersTable;
