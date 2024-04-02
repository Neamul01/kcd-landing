import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const EditTicketModal = ({ open, onClose, ticket = {}, onUpdate }) => {
  const [editedTicket, setEditedTicket] = useState({});

  useEffect(() => {
    setEditedTicket(ticket || {});
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: name === "isAvailable" ? value === "true" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTicket);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-ticket-modal-title"
      aria-describedby="edit-ticket-modal-description"
    >
      <Box
        sx={{
          borderRadius: "8px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2
          id="edit-ticket-modal-title"
          className="text-2xl text-center font-semibold"
        >
          Edit Ticket
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={editedTicket.title || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={editedTicket.description || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={editedTicket.price || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Limit"
            name="limit"
            value={editedTicket.limit || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <div>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="available-status-label">Ticket Type</InputLabel>
              <Select
                labelId="available-status-label"
                id="available-status"
                name="ticketType"
                value={editedTicket.ticketType}
                onChange={handleChange}
                label="Ticket Type"
              >
                <MenuItem value={"professional"}>professional</MenuItem>
                <MenuItem value={"student"}>student</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            fullWidth
            label="Expiry Date"
            name="expiryDate"
            value={dayjs(editedTicket.expiryDate || "").format("YYYY-MM-DD")}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="date"
          />

          <div>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="available-status-label">
                Available status
              </InputLabel>
              <Select
                labelId="available-status-label"
                id="available-status"
                name="isAvailable"
                value={editedTicket.isAvailable ? true : false}
                onChange={handleChange}
                label="Available status"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button type="submit" variant="contained" color="primary">
            Update Data
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTicketModal;
