"use client";

import * as React from "react";
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
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import axiosInstance from "@/lib/Axios";
import { toast } from "react-toastify";
import { Schedule } from "./SchedulesTable";

const schema = zod.object({
  scheduleTime: zod.string().min(1, { message: "scheduleTime is required" }),
  title: zod.string().min(1, { message: "Designation is required" }),
  description: zod.string().min(1, { message: "Organization is required" }),
  scheduleTrack: zod
    .string()
    .min(1, { message: "Role is required" })
    .optional(),
  speaker: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

const ScheduleDetailsForm = ({
  selectedSchedule,
  closeModal,
}: {
  selectedSchedule?: Schedule;
  closeModal?: () => void;
}) => {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedSchedule?.title || "",
      description: selectedSchedule?.description || "",
      scheduleTrack: selectedSchedule?.scheduleTrack || "",
      speaker: selectedSchedule?.speaker || "",
      scheduleTime: selectedSchedule?.scheduleTrack || "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      console.log("-------------form values", values);
      setIsPending(true);

      if (selectedSchedule && closeModal) {
        // ----------------edit form
        console.log("edit form");
        return await axiosInstance
          .put(`/schedules/${selectedSchedule._id}`, values)
          .then((res) => {
            toast.success("Participant Updated Successfully.");
            console.log("res", res);
            reset();
          })
          .catch((err) => {
            console.log("err", err);
            toast.error("Something went wrong please try again.");
          })
          .finally(() => {
            setIsPending(false);
            closeModal();
          });
      }
      console.log("add form");

      await axiosInstance
        .post("/schedules", values)
        .then((res) => {
          toast.success("Participant Added Successfully.");
          console.log("res", res);
          reset();
        })
        .catch((err) => {
          console.log("err", err);
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

  React.useEffect(() => {
    if (selectedSchedule) {
      reset({
        title: selectedSchedule.title,
        description: selectedSchedule.description,
        scheduleTrack: selectedSchedule.scheduleTrack,
        scheduleTime: selectedSchedule.scheduleTime,
        speaker: selectedSchedule.speaker,
      });
    }
  }, [selectedSchedule, reset]);

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
                <OutlinedInput size="small" {...field} label="title" />
                {errors.title && (
                  <FormHelperText>{errors.title.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* ['keynote-track', 'devops-track', 'security-track', 'startup-community-hub'] */}
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
          <Controller
            control={control}
            name="speaker"
            render={({ field }) => (
              <FormControl error={Boolean(errors.speaker)}>
                <InputLabel size="small">Speaker</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Sponsor Link (LinkedIn/URL)"
                />
                {errors.speaker ? (
                  <FormHelperText>{errors.speaker.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

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
                  rows={4}
                  maxRows={9}
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

export default ScheduleDetailsForm;
