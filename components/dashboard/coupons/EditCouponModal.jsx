import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CouponDetailsForm from "./CouponDetailsFrom";

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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Edit Participant</DialogTitle>
      <DialogContent>
        <div className="py-2">
          <CouponDetailsForm selectedSchedule={coupon} closeModal={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCouponModal;
