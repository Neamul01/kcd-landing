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
import ScheduleDetailsForm from "./ScheduleDetailsForm";
import { GetParticipants } from "../speakers/ParticipantsTable";

function noop(): void {
  // do nothing
}

export interface Schedule {
  scheduleTime: string;
  title: string;
  description: string;
  scheduleTrack: string;
  speakers: GetParticipants[];
  _id: string;
  createdAt: string;
}

interface CustomersTableProps {
  handleReload: () => void;
  count?: number;
  page?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rows?: Schedule[];
  rowsPerPage?: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export function SchedulesTable({
  handleReload,
  count = 0,
  rows = [],
  page = 0,
  setPage,
  rowsPerPage = 0,
  setRowsPerPage,
}: CustomersTableProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteSchedule, setDeleteSchedule] = React.useState<Schedule | null>();
  const [selectedRow, setSelectedRow] = React.useState<Schedule>();

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleEdit = (schedule: Schedule) => {
    setOpen(true);
    setSelectedRow(schedule);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDeleteClick = (schedule: Schedule) => {
    setDeleteSchedule(schedule);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (deleteSchedule) {
      await axiosInstance
        .delete(`/schedules/${deleteSchedule._id}`)
        .then(() => {
          setOpenDelete(false);
          toast.success("Successfully deleted Schedule");
        })
        .catch(() => toast.error("Something went wrong please try again."))
        .finally(() => {
          setDeleteSchedule(null);
          setOpenDelete(false);
        });
    } else {
      toast.error("Please select a Schedule to delete.");
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
              <TableCell>Schedule Track</TableCell>
              <TableCell>Speakers</TableCell>
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
                  <TableCell>{row.scheduleTime}</TableCell>
                  <TableCell>
                    {/* {dayjs(row.createdAt).format("MMM D, YYYY")} */}
                    {row.scheduleTrack}
                  </TableCell>
                  <TableCell>
                    {/* {dayjs(row.createdAt).format("MMM D, YYYY")} */}
                    {row.speakers?.map((speaker) => (
                      <div key={speaker._id} className="flex flex-col">
                        <span>
                          {speaker.name} - {speaker.designation}
                        </span>
                      </div>
                    ))}
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
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <div className="py-2">
            <ScheduleDetailsForm
              selectedSchedule={selectedRow as Schedule}
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
          Want to delete: {deleteSchedule?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete {deleteSchedule?.title}. his/her all data will be
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
