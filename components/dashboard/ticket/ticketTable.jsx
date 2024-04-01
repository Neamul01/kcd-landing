import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export default function TicketTable({ tickets, onDelete }) {
  if (!Array.isArray(tickets)) {
    return null;
  }

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <Card>
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
                <TableCell>{ticket.isAvailable ? "True" : "False"}</TableCell>
                <TableCell>
                  {dayjs(ticket.createdAt).format("MMM D, YYYY")}
                </TableCell>
                <div>
                  <TableCell>
                    <FaEdit className="text-green-600" />
                  </TableCell>
                  <TableCell>
                    <FaTrash
                      className="text-red-600"
                      onClick={() => handleDelete(ticket._id)}
                    />
                  </TableCell>
                </div>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
