"use client";

import axiosInstance from "@/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z as zod } from "zod";

const ticketTypeEnum = zod.enum(["professional", "student"]);

const schema = zod.object({
  title: zod.string().min(1, { message: "Title is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
  price: zod.string().min(1, { message: "Price is required" }),
  limit: zod.string().min(1, { message: "Limit is required" }),
  ticketType: ticketTypeEnum.default("professional"),
  expiryDate: zod.string().min(1, { message: "Expiry date is required" }),
  isAvailable: zod.boolean(),
});

const defaultValues = {
  title: "",
  description: "",
  price: "",
  limit: "",
  ticketType: "",
  expiryDate: new Date(),
  isAvailable: true,
};

const TicketForm = ({ getResData }) => {
  const [isPending, setIsPending] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      console.log("form values", values);
      setIsPending(true);

      const submitData = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        limit: Number(values.limit),
        ticketType: values.ticketType,
        expiryDate: values.expiryDate,
        isAvailable: values.isAvailable,
      };

      const formData = new FormData();

      // Append other form fields to FormData
      Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("form data", formData);

      await axiosInstance
        .post("/tickets", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res", res.data.data);
          getResData(res.data.data);
          toast.success("Ticket created successfully");
        })
        .catch((err) => {
          console.log("err", err);
          alert("Something went wrong please try again");
        })
        .finally(() => {
          setIsPending(false);
        });
    } catch {
      () => {
        alert("Something went wrong please try again..");
      };
    } finally {
      setIsPending(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <FormControl error={Boolean(errors.title)}>
                <InputLabel size="small">Title</InputLabel>
                <OutlinedInput size="small" {...field} label="Title" />
                {errors.title && (
                  <FormHelperText>{errors.title.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormControl error={Boolean(errors.description)}>
                <InputLabel size="small">Description</InputLabel>
                <OutlinedInput size="small" {...field} label="Description" />
                {errors.description && (
                  <FormHelperText>{errors.description.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <FormControl error={Boolean(errors.price)}>
                <InputLabel size="small">Price</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Price"
                  type="number"
                />
                {errors.price ? (
                  <FormHelperText>{errors.price.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="ticketType"
            render={({ field }) => (
              <FormControl error={Boolean(errors.ticketType)}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Ticket Type
                </InputLabel>
                <Select
                  {...field}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Ticket Type"
                >
                  <MenuItem value={"professional"}>professional</MenuItem>
                  <MenuItem value={"student"}>student</MenuItem>
                </Select>
                {errors.ticketType ? (
                  <FormHelperText>{errors.ticketType.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="limit"
            render={({ field }) => (
              <FormControl error={Boolean(errors.limit)}>
                <InputLabel size="small">Limit</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Limit"
                  type="number"
                />
                {errors.limit ? (
                  <FormHelperText>{errors.limit.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="expiryDate"
            render={({ field }) => (
              <FormControl error={Boolean(errors.expiryDate)}>
                <InputLabel size="small">Expiry Date</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Expiry Date"
                  type="date"
                />
                {errors.expiryDate ? (
                  <FormHelperText>{errors.expiryDate.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="isAvailable"
            render={({ field }) => (
              <FormControl error={Boolean(errors.isAvailable)}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Available
                </InputLabel>
                <Select
                  {...field}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Available"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
                {errors.isAvailable ? (
                  <FormHelperText>{errors.isAvailable.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button
            // disabled={isPending}
            type="submit"
            variant="contained"
            className="bg-primary/80"
          >
            {isPending ? "Loading..." : "Add"}
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default TicketForm;
