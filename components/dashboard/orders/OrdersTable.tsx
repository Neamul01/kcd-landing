"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import { useSelection } from "@/hooks/use-selection";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import { TfiReload } from "react-icons/tfi";
import axiosInstance from "@/lib/Axios";
import { toast } from "react-toastify";
import OrdersDetailsForm from "./OrdersDetailsForm";

export interface Orders {
  createdAt: string;
  designation: string;
  name: string;
  organization: string;
  photo: string;
  role: string;
  sponsor_link: string;
  sponsor_status: string;
  _id: string;
}

interface OrdersTableProps {
  handleReload: () => void;
  count?: number;
  page?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rows?: Orders[];
  rowsPerPage?: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrdersTable({
  handleReload,
  count = 0,
  rows = [],
  page = 0,
  setPage,
  rowsPerPage = 0,
  setRowsPerPage,
}: OrdersTableProps) {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteParticipant, setDeleteParticipant] =
    React.useState<Orders | null>();
  const [selectedRow, setSelectedRow] = React.useState<Orders>();

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleEdit = (participant: Orders) => {
    setOpen(true);
    setSelectedRow(participant);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDeleteClick = (participant: Orders) => {
    setDeleteParticipant(participant);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (deleteParticipant) {
      await axiosInstance
        .delete(`/participants/${deleteParticipant._id}`)
        .then(() => {
          setOpenDelete(false);
          toast.success("Successfully deleted participant");
        })
        .catch(() => toast.error("Something went wrong please try again."))
        .finally(() => setDeleteParticipant(null));
    } else {
      toast.error("Please select a participant to delete.");
    }
  };

  return (
    <Card>
      <div
        onClick={() => handleReload()}
        className="flex justify-end px-9 cursor-pointer"
      >
        <Tooltip title="Reload" placement="top">
          <TfiReload size={22} />
        </Tooltip>
      </div>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row._id);

              return (
                <TableRow hover key={row._id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row._id);
                        } else {
                          deselectOne(row._id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      {row.photo ? (
                        <Image
                          width={40}
                          height={40}
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${row.photo}`}
                          alt="Participant"
                          className="bg-cover rounded-full border border-gray-500"
                        />
                      ) : (
                        <Avatar />
                      )}
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.organization}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    {dayjs(row.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(row)}>
                      <CiEdit size={20} />
                    </Button>
                    <Button onClick={() => handleDeleteClick(row)}>
                      <MdDeleteOutline size={20} className="text-accent" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 35, 45, 55]}
      />

      {/* ------------------update modal------------- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Edit Participant</DialogTitle>
        <DialogContent>
          <div className="py-2">
            <OrdersDetailsForm
              selectedParticipant={selectedRow as Orders}
              closeModal={closeModal}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* ---------------------delete modal--------------- */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Want to delete: {deleteParticipant?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete {deleteParticipant?.name}. his/her all data will be
            removed from database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
