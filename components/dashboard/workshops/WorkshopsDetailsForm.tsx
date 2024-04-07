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
import { Participant } from "../speakers/ParticipantsTable";
import { Workshop } from "./WorkshopsTable";

const schema = zod.object({
  title: zod.string().min(1, { message: "Title is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
  limit: zod.number().min(1, { message: "Limit is required" }),
  schedule: zod.string().min(1, { message: "Schedule is required" }),
  level: zod.string().min(1, { message: "Level is required" }),
  sessionTime: zod.string().min(1, { message: "Session Time is required" }),
});

type Values = zod.infer<typeof schema>;

const WorkshopsDetailsForm = ({
  selectedSchedule: selectedWorkshops,
  closeModal,
}: {
  selectedSchedule?: Workshop;
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
      title: selectedWorkshops?.title || "",
      description: selectedWorkshops?.description || "",
      limit: selectedWorkshops?.limit || 1,
      schedule: selectedWorkshops?.schedule || "",
      level: selectedWorkshops?.level || "",
      sessionTime: selectedWorkshops?.sessionTime || "",
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

      if (selectedWorkshops && closeModal) {
        // ----------------edit form
        console.log("edit form", values);
        return await axiosInstance
          .put(`/workshops/${selectedWorkshops._id}`, values)
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
      console.log("add form", values);

      await axiosInstance
        .post("/workshops", values)
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
    if (selectedWorkshops) {
      reset({
        title: selectedWorkshops.title,
        description: selectedWorkshops.description,
        limit: selectedWorkshops.limit,
        schedule: selectedWorkshops.schedule,
        level: selectedWorkshops.level,
        sessionTime: selectedWorkshops.sessionTime,
      });
    }
  }, [selectedWorkshops, reset]);

  // -------------speaker autocomplete ---------------------------
  //   const handleOptionSelect = (value: Participant | null) => {
  //     if (value) {
  //       console.log("selected value", value._id);
  //       setValue("speaker", value._id);
  //       clearErrors("speaker");
  //     } else {
  //       setValue("speaker", "");
  //     }
  //   };
  //   const fetchAllParticipants = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get(`/participants?role=speaker`);
  //       const data: Participant[] = response.data.data.map(
  //         (participant: Participant) => participant
  //       );
  //       setFetchedData(data);
  //       setOptions(data);
  //     } catch (error) {
  //       console.error("Error fetching participants:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   React.useEffect(() => {
  //     if (open) {
  //       fetchAllParticipants();
  //     }
  //   }, [open]);

  //   const handleInputChange = (
  //     event: React.SyntheticEvent<Element, Event>,
  //     value: string,
  //     reason: AutocompleteInputChangeReason
  //   ) => {
  //     const inputValue = value;
  //     setInputValue(inputValue);
  //     const filteredOptions = fetchedData.filter((participant) =>
  //       participant.name.toLowerCase().includes(inputValue.toLowerCase())
  //     );
  //     setOptions(filteredOptions);
  //   };

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

          <Controller
            control={control}
            name="schedule"
            render={({ field }) => (
              <FormControl error={Boolean(errors.schedule)}>
                <InputLabel size="small">Schedule</InputLabel>
                <OutlinedInput size="small" {...field} label="Schedule" />
                {errors.schedule ? (
                  <FormHelperText>{errors.schedule.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="sessionTime"
            render={({ field }) => (
              <FormControl error={Boolean(errors.sessionTime)}>
                <InputLabel size="small">Session Time</InputLabel>
                <OutlinedInput size="small" {...field} label="sessionTime" />
                {errors.sessionTime ? (
                  <FormHelperText>{errors.sessionTime.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          {/* -------------speaker autocomplete------------ */}
          {/* <div className="">
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
          </div> */}
          {/* ------------------- */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/*  ['beginner', 'intermediate', 'advanced'] */}
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <FormControl error={Boolean(errors.level)}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Level
                </InputLabel>
                <Select
                  {...field}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Level"
                >
                  <MenuItem value={"beginner"}>Beginner</MenuItem>
                  <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                  <MenuItem value={"advanced"}>Advanced</MenuItem>
                </Select>
                {errors.level ? (
                  <FormHelperText>{errors.level.message}</FormHelperText>
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
                  {...field}
                  size="small"
                  type="number"
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(value);
                  }}
                  label="Limit"
                />
                {errors.limit ? (
                  <FormHelperText>{errors.limit.message}</FormHelperText>
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
          {isPending ? "Loading..." : selectedWorkshops ? "Update" : "Add"}
        </Button>
      </Stack>
    </form>
  );
};

export default WorkshopsDetailsForm;
