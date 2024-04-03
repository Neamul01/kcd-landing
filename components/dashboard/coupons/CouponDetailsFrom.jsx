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

const schema = zod.object({
  code: zod.string().min(1, { message: "Code is required" }),
  discountPercentage: zod
    .string()
    .min(1, { message: "Discount Percentage is required" }),
  limit: zod.string().min(1, { message: "Limit is required" }),
  products: zod
    .array(zod.string())
    .min(1, { message: "At least one product is required" }),
  expiryDate: zod.string().min(1, { message: "Expiry date is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
});

const CouponDetailsForm = ({ selectedSchedule, closeModal }) => {
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
      code: "Kodekloud",
      discountPercentage: "20",
      limit: "1",
      products: ["productId"], // Ensure it's an array of strings
      expiryDate: new Date().toISOString().split("T")[0],
      description: "This coupon will be used by Kodekloud users",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      setIsPending(true);

      if (selectedSchedule && closeModal) {
        return await axiosInstance
          .put(`/schedules/${selectedSchedule._id}`, values)
          .then((res) => {
            toast.success("Schedule Updated Successfully.");
            reset();
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
        .post("/schedules", values)
        .then((res) => {
          toast.success("Schedule Added Successfully.");
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
    if (selectedSchedule) {
      reset({
        title: selectedSchedule.title,
        description: selectedSchedule.description,
        scheduleTrack: selectedSchedule.scheduleTrack,
        scheduleTime: selectedSchedule.scheduleTime,
        speaker: selectedSchedule.speaker._id,
      });
    }
  }, [selectedSchedule, reset]);

  const handleOptionSelect = (value) => {
    if (value) {
      setValue("speaker", value._id);
      clearErrors("speaker");
    } else {
      setValue("speaker", "");
    }
  };

  const fetchAllParticipants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/coupons`);
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
                <InputLabel size="small">Discount</InputLabel>
                <OutlinedInput size="small" {...field} label="Discount" />
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
            name="scheduleTrack"
            render={({ field }) => (
              <FormControl error={Boolean(errors.scheduleTrack)}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Schedule Track
                </InputLabel>
                <Select
                  {...field}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Schedule Track"
                >
                  <MenuItem value={"keynote-track"}>Keynote Track</MenuItem>
                  <MenuItem value={"devops-track"}>Devops Track</MenuItem>
                  <MenuItem value={"security-track"}>Security Track</MenuItem>
                  <MenuItem value={"startup-community-hub"}>
                    Startup Community Hub
                  </MenuItem>
                </Select>
                {errors.scheduleTrack ? (
                  <FormHelperText>
                    {errors.scheduleTrack.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <div className="">
            <Autocomplete
              id="asynchronous-demo"
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              options={options}
              loading={loading}
              inputValue={inputValue}
              onInputChange={(event, value, reason) =>
                handleInputChange(event, value, reason)
              }
              onChange={(event, value) => handleOptionSelect(value)}
              getOptionLabel={(option) => {
                const code = option.code || "";

                return `${code}`;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Select Coupon"
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
            {errors.speaker ? (
              <FormHelperText error>{errors.speaker.message}</FormHelperText>
            ) : null}
          </div>

          <Controller
            control={control}
            name="scheduleTime"
            render={({ field }) => (
              <FormControl error={Boolean(errors.scheduleTime)}>
                <InputLabel size="small">Schedule Time</InputLabel>
                <OutlinedInput size="small" {...field} label="scheduleTime" />
                {errors.scheduleTime ? (
                  <FormHelperText>{errors.scheduleTime.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
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
          {isPending ? "Loading..." : selectedSchedule ? "Update" : "Add"}
        </Button>
      </Stack>
    </form>
  );
};

export default CouponDetailsForm;
