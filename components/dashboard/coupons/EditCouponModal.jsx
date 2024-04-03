import { Box, Button, Modal, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const EditCouponModal = ({ open, onClose, coupon = {}, onUpdate }) => {
  const [editedCoupon, setEditedCoupon] = useState({});

  useEffect(() => {
    setEditedCoupon(coupon || {});
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedCoupon);
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
          Edit Coupon
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Code"
            name="code"
            value={editedCoupon.code || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Discount"
            name="discountPercentage"
            value={editedCoupon.discountPercentage || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Limit"
            name="limit"
            value={editedCoupon.limit || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Products"
            name="products"
            value={editedCoupon.products || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Expiry Date"
            name="expiryDate"
            value={dayjs(editedCoupon.expiryDate || "").format("YYYY-MM-DD")}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="date"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={editedCoupon.description || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary">
            Update Data
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditCouponModal;
