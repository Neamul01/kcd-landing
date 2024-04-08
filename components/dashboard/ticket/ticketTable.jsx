import axiosInstance from "@/lib/Axios";
import { Button, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { toast } from "react-toastify";
import EditTicketModal from "./editTicketModal";
const TicketTable = ({ tickets, onDelete, handleReload }) => {
  const [editingTicket, setEditingTicket] = useState(null);

  if (!Array.isArray(tickets) || tickets.length === 0) {
    return (
      <Card>
        <div className="flex justify-end px-9 cursor-pointer ">
          <Tooltip
            title="Reload"
            placement="top"
            onClick={() => handleReload()}
          >
            <TfiReload size={22} />
          </Tooltip>
        </div>
        <Box sx={{ p: 2 }}>No tickets available</Box>
      </Card>
    );
  }

  const handleUpdate = async (updatedTicket) => {
    try {
      await axiosInstance.put(`/tickets/${updatedTicket._id}`, updatedTicket);
      const updatedTickets = tickets.map((ticket) =>
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      );
      onUpdate(updatedTickets);
      setEditingTicket(null);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleCloseModal = () => {
    setEditingTicket(null);
    toast.success("Ticket updated successfully");
  };

  return (
    <Card>
      <div className="flex justify-end px-9 cursor-pointer ">
        <Tooltip title="Reload" placement="top" onClick={() => handleReload()}>
          <TfiReload size={22} />
        </Tooltip>
      </div>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Ticket Type</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Available status</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell>{ticket.limit}</TableCell>
                <TableCell>{ticket.ticketType}</TableCell>
                <TableCell>
                  {dayjs(ticket.expiryDate).format("MMM D, YYYY")}
                </TableCell>
                <TableCell>{ticket.isAvailable ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {dayjs(ticket.createdAt).format("MMM D, YYYY")}
                </TableCell>
                <TableCell>
                  <Button>
                    <CiEdit size={20} onClick={() => handleEditClick(ticket)} />
                  </Button>
                  <Button>
                    <MdDeleteOutline
                      size={20}
                      onClick={() => handleDelete(ticket._id)}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditTicketModal
          open={!!editingTicket}
          onClose={handleCloseModal}
          ticket={editingTicket}
          onUpdate={handleUpdate}
        />
      </Box>
    </Card>
  );
};

export default TicketTable;
