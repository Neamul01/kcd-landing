// import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
// import TicketTable from "@/components/dashboard/ticket/ticketTable";
// import { config } from "@/config";
// import axiosInstance from "@/lib/Axios";
// import Stack from "@mui/material/Stack";
// import React, { useEffect, useState } from "react";

// export const metadata = {
//   title: `Tickets | Dashboard | ${config.site.name}`,
// };

// export default function TicketList() {
//   const page = 0;
//   const rowsPerPage = 5;
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get("/tickets");
//         const formattedData = response.data.data.map((ticket) => ({
//           id: ticket._id,
//           title: ticket.title,
//           description: ticket.description,
//           price: ticket.price,
//           limit: ticket.limit,
//           ticketType: ticket.ticketType,
//           expiryDate: ticket.expiryDate,
//           isAvailable: ticket.isAvailable,
//         }));

//         console.log("tickets", response.data.data);
//         console.log("formattedData", formattedData);
//         setTickets(formattedData);
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//         setError("Error fetching tickets. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, []);

//   const paginatedTickets = applyPagination(tickets, page, rowsPerPage);

//   return (
//     <Stack spacing={3}>
//       <CustomersFilters />
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <TicketTable
//           count={paginatedTickets.length}
//           page={page}
//           rows={paginatedTickets}
//           rowsPerPage={rowsPerPage}
//         />
//       )}
//     </Stack>
//   );
// }

// function applyPagination(rows, page, rowsPerPage) {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
