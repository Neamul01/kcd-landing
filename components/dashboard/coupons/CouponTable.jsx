import EditCouponModal from "@/components/dashboard/coupons/EditCouponModal";
import axiosInstance from "@/lib/Axios";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { toast } from "react-toastify";
import CouponDetailsForm from "./CouponDetailsFrom";

const CouponTable = ({ coupons, handleReload, onDelete }) => {
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [open, setOpen] = useState(false);

  if (!Array.isArray(coupons) || coupons.length === 0) {
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
        <Box sx={{ p: 2 }}>No coupons available</Box>
      </Card>
    );
  }

  const handleUpdate = async (updatedCoupon) => {
    try {
      await axiosInstance.put(`/coupons/${updatedCoupon._id}`, updatedCoupon);
      const updatedCoupons = coupons.map((coupon) =>
        coupon._id === updatedCoupon._id ? updatedCoupon : coupon
      );
      toast.success("Coupon updated successfully");
      onUpdate(updatedCoupons);
      setEditingCoupon(null);
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEditClick = (coupon) => {
    setOpen(true);
    setEditingCoupon(coupon);
  };

  const onClose = () => {
    setOpen(false);
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
              <TableCell>Code</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.discountPercentage}</TableCell>
                <TableCell>{coupon.limit}</TableCell>
                <TableCell>
                  {coupon.products.map((product, index) => (
                    <p key={index}>{product.title}</p>
                  ))}
                </TableCell>

                <TableCell>{coupon.description}</TableCell>
                <TableCell>
                  {dayjs(coupon.expiryDate).format("MMM D, YYYY")}
                </TableCell>
                {/* <TableCell>
                  {dayjs(coupon.createdAt).format("MMM D, YYYY")}
                </TableCell> */}
                <TableCell>
                  <Button>
                    <CiEdit size={20} onClick={() => handleEditClick(coupon)} />
                  </Button>
                  <Button>
                    <MdDeleteOutline
                      size={20}
                      onClick={() => handleDelete(coupon._id)}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <EditCouponModal
          open={!!editingCoupon}
          onClose={handleCloseModal}
          coupon={editingCoupon}
          onUpdate={handleUpdate}
        /> */}

        {/* -----------edit modal */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Edit Participant</DialogTitle>
          <DialogContent>
            <div className="py-2">
              <CouponDetailsForm
                selectedSchedule={editingCoupon}
                closeModal={onClose}
              />
            </div>
          </DialogContent>
        </Dialog>
      </Box>
    </Card>
  );
};

export default CouponTable;
