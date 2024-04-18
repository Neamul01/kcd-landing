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
import WorkshopsDetailsForm from "./WorkshopsDetailsForm";

function noop(): void {
  // do nothing
}

export interface Workshop {
  title: string;
  description: string;
  limit: number;
  schedule: string;
  level?: string;
  minimumSkill?: string;
  sessionTime: string;
  availability: boolean;
  _id: string;
  createdAt: string;
}

interface WorkshopsTableProps {
  handleReload: () => void;
  count?: number;
  page?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rows?: Workshop[];
  rowsPerPage?: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export function WorkshopsTable({
  handleReload,
  count = 0,
  rows = [],
  page = 0,
  setPage,
  rowsPerPage = 0,
  setRowsPerPage,
}: WorkshopsTableProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteParticipant, setDeleteParticipant] =
    React.useState<Workshop | null>();
  const [selectedRow, setSelectedRow] = React.useState<Workshop>();

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleEdit = (participant: Workshop) => {
    setOpen(true);
    setSelectedRow(participant);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDeleteClick = (participant: Workshop) => {
    setDeleteParticipant(participant);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (deleteParticipant) {
      await axiosInstance
        .delete(`/workshops/${deleteParticipant._id}`)
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
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Schedule Time</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>SessionTime</TableCell>
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
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.schedule}</TableCell>
                  <TableCell>
                    {/* {dayjs(row.createdAt).format("MMM D, YYYY")} */}
                    {row.limit}
                  </TableCell>
                  <TableCell>
                    {/* {dayjs(row.createdAt).format("MMM D, YYYY")} */}
                    {row.sessionTime}
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
          setRowsPerPage(parseInt(event.target.value))
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
            <WorkshopsDetailsForm
              selectedSchedule={selectedRow as Workshop}
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
          Want to delete: {deleteParticipant?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete {deleteParticipant?.title}. All data will be removed
            from database.
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
