"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteInputChangeReason,
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
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import axiosInstance from "@/lib/Axios";
import { toast } from "react-toastify";
import { Schedule } from "./SchedulesTable";
import { Participant } from "../speakers/ParticipantsTable";

const schema = zod.object({
  scheduleTime: zod.string().min(1, { message: "scheduleTime is required" }),
  title: zod.string().min(1, { message: "Designation is required" }),
  description: zod.string().min(1, { message: "Organization is required" }),
  scheduleTrack: zod.string().min(1, { message: "Role is required" }),
  speaker: zod.string().min(1, { message: "Organization is required" }),
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
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedSchedule?.title || "",
      description: selectedSchedule?.description || "",
      scheduleTrack: selectedSchedule?.scheduleTrack || "",
      speaker: selectedSchedule?.speaker._id || "",
      scheduleTime: selectedSchedule?.scheduleTrack || "",
    },
    resolver: zodResolver(schema),
  });

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Participant[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [fetchedData, setFetchedData] = React.useState<Participant[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      console.log("-------------form values", values);
      setIsPending(true);

      if (selectedSchedule && closeModal) {
        // ----------------edit form
        console.log("edit form", values);
        return await axiosInstance
          .put(`/schedules/${selectedSchedule._id}`, values)
          .then((res) => {
            toast.success("Schedule Updated Successfully.");
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
          toast.success("Schedule Added Successfully.");
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
        speaker: selectedSchedule.speaker._id,
      });
    }
  }, [selectedSchedule, reset]);

  // -------------speaker autocomplete ---------------------------
  const handleOptionSelect = (value: Participant | null) => {
    if (value) {
      console.log("selected value", value._id);
      setValue("speaker", value._id);
      clearErrors("speaker");
    } else {
      setValue("speaker", "");
    }
  };
  const fetchAllParticipants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/participants?limit=10&role[in]=key-note-speaker&role[in]=event-speaker`
      );
      const data: Participant[] = response.data.data.map(
        (participant: Participant) => participant
      );
      setFetchedData(data);
      setOptions(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchAllParticipants();
    }
  }, [open]);

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
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

          {/* -------------speaker autocomplete------------ */}
          <div className="">
            <Autocomplete
              id="asynchronous-demo"
              // sx={{ width: 300 }}
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
                const name = option.name || "";
                const designation = option.designation || "";
                return `${name} - ${designation}`;
              }}
              // defaultValue={selectedSchedule?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Select speakers"
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
          {/* ------------------- */}
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

export default ScheduleDetailsForm;
