"use client";

import axiosInstance from "@/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z as zod } from "zod";
import dayjs from "dayjs";

const schema = zod.object({
  code: zod.string().min(1, { message: "Code is required" }),
  discountPercentage: zod
    .string()
    .min(1, { message: "Discount Percentage is required" }),
  limit: zod.string().min(1, { message: "Limit is required" }),
  products: zod
    .array(zod.string())
    .min(1, { message: "At least one ticket is required" }),
  expiryDate: zod.string().min(1, { message: "Expiry date is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
  isAvailable: zod.boolean(),
});

const CouponDetailsForm = ({
  selectedSchedule: selectedCoupon,
  closeModal,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      discountPercentage: "",
      limit: "",
      products: [],
      isAvailable: false,
      expiryDate: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      setIsPending(true);
      // setInputValue("");
      // reset()

      if (selectedCoupon && closeModal) {
        return await axiosInstance
          .put(`/coupons/${selectedCoupon._id}`, values)
          .then((res) => {
            toast.success("Ticket Updated Successfully.");
            reset();
            setInputValue("");
            setOptions("");
            setFetchedData("");
          })
          .catch(() => {
            toast.error("Something went wrong please try again.");
          })
          .finally(() => {
            setIsPending(false);
            closeModal();
          });
      }

      await axiosInstance
        .post("/coupons", values)
        .then((res) => {
          toast.success("Ticket Added Successfully.");
          reset();
        })
        .catch(() => {
          toast.error("Something went wrong please try again.");
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
    }
  };

  useEffect(() => {
    if (selectedCoupon) {
      console.log("selected coupon", selectedCoupon);

      const productIds = selectedCoupon.products.map((product) =>
        product._id.toString()
      );

      reset({
        code: selectedCoupon.code,
        description: selectedCoupon.description,
        discountPercentage: `${selectedCoupon.discountPercentage}`,
        expiryDate: selectedCoupon.expiryDate,
        products: productIds,
        limit: `${selectedCoupon.limit}`,
        isAvailable: selectedCoupon.isAvailable,
      });
    }
  }, [selectedCoupon, reset]);

  const handleOptionSelect = (values) => {
    const productIds = values ? values.map((value) => value._id) : []; // Extract IDs from each object or set to empty array
    setValue("products", productIds); // Set IDs to the hook-form field
    clearErrors("products");
  };

  const fetchAllParticipants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/tickets`);
      const data = response.data.data.map((participant) => participant);
      setFetchedData(data);
      setOptions(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchAllParticipants();
    }
  }, [open]);

  const handleInputChange = (event, value, reason) => {
    const inputValue = value;
    setInputValue(inputValue);
    const filteredOptions = fetchedData.filter((participant) =>
      participant.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl error={Boolean(errors.code)}>
                <InputLabel size="small">Code</InputLabel>
                <OutlinedInput size="small" {...field} label="code" />
                {errors.code && (
                  <FormHelperText>{errors.code.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="discountPercentage"
            render={({ field }) => (
              <FormControl error={Boolean(errors.discountPercentage)}>
                <InputLabel size="small">Discount (%)</InputLabel>
                <OutlinedInput
                  size="small"
                  type="number"
                  {...field}
                  label="Discount (%)"
                />
                {errors.discountPercentage && (
                  <FormHelperText>
                    {errors.discountPercentage.message}
                  </FormHelperText>
                )}
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
                  type="number"
                  {...field}
                  label="Limit"
                />
                {errors.limit && (
                  <FormHelperText>{errors.limit.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <div className="">
            <Autocomplete
              multiple
              id="asynchronous-demo"
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) => option._id === value._id}
              defaultValue={selectedCoupon?.products || []}
              options={options}
              loading={loading}
              inputValue={inputValue}
              onInputChange={(event, value, reason) =>
                handleInputChange(event, value, reason)
              }
              onChange={(event, value) => handleOptionSelect(value)}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              getOptionLabel={(option) => {
                return option.title || "";
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Select Ticket"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            {errors.products ? (
              <FormHelperText error>
                {errors.products.message
                  ? errors.products.message
                  : "Please select at least a ticket"}
              </FormHelperText>
            ) : null}
          </div>

          <div className="">
            <Controller
              control={control}
              name="expiryDate"
              render={({ field }) => (
                <FormControl error={Boolean(errors.expiryDate)}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    name="expiryDate"
                    value={
                      selectedCoupon?.expiryDate
                        ? dayjs(selectedCoupon?.expiryDate).format("YYYY-MM-DD")
                        : field.value
                    }
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                    variant="outlined"
                    size="small"
                    margin="none"
                    type="date"
                  />
                </FormControl>
              )}
            />
            {errors.expiryDate ? (
              <FormHelperText error>{errors.expiryDate.message}</FormHelperText>
            ) : null}
          </div>

          {/* <div className="w-full"> */}
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
          {errors.isAvailable ? (
            <FormHelperText error>{errors.isAvailable.message}</FormHelperText>
          ) : null}
          {/* </div> */}
        </div>

        <div className="grid grid-cols-1">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormControl error={Boolean(errors.description)}>
                <InputLabel size="small">Description</InputLabel>
                <OutlinedInput
                  size="small"
                  multiline
                  minRows={4}
                  maxRows={12}
                  {...field}
                  label="description"
                />
                {errors.description ? (
                  <FormHelperText>{errors.description.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="contained"
          className="bg-primary/80"
        >
          {isPending ? "Loading..." : selectedCoupon ? "Update" : "Add"}
        </Button>
      </Stack>
    </form>
  );
};

export default CouponDetailsForm;
