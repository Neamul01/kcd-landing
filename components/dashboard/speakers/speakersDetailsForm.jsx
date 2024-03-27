"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import { z as zod } from "zod";

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  designation: zod.string().min(1, { message: "Designation is required" }),
  organization: zod.string().min(1, { message: "Organization is required" }),
  role: zod.string().min(1, { message: "Role is required" }),
  sponsor_status: zod
    .string()
    .min(1, { message: "Sponsor status is required" }),
  file: zod.string().min(1, { message: "File is required" }),
});

const defaultValues = {
  name: "",
  designation: "",
  organization: "",
  role: "",
  sponsor_status: "",
  file: null,
};

const SpeakersDetailsForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    try {
      schema.parse(data);
      console.log("Form data is valid:", data);
    } catch (error) {
      console.error(error.errors);

      // Handle form validation errors and display error messages
      if (error.errors && Array.isArray(error.errors)) {
        const newErrors = {};
        error.errors.forEach((validationError) => {
          if (validationError.path && validationError.message) {
            newErrors[validationError.path[0]] = validationError.message;
          }
        });
        setFormErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FormControl error={Boolean(errors.name)}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput {...field} label="Name" />
              {errors.name && (
                <FormHelperText>{errors.name.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="designation"
          render={({ field }) => (
            <FormControl error={Boolean(errors.designation)}>
              <InputLabel>Designation</InputLabel>
              <OutlinedInput {...field} label="Designation" />
              {errors.designation ? (
                <FormHelperText>{errors.designation.message}</FormHelperText>
              ) : null}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="organization"
          render={({ field }) => (
            <FormControl error={Boolean(errors.organization)}>
              <InputLabel>Organization</InputLabel>
              <OutlinedInput {...field} label="Organization" />
              {errors.organization ? (
                <FormHelperText>{errors.organization.message}</FormHelperText>
              ) : null}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <FormControl error={Boolean(errors.role)}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
              >
                <MenuItem value={"Speaker"}>Speaker</MenuItem>
                <MenuItem value={"Organizer"}>Organizer</MenuItem>
              </Select>
              {errors.role ? (
                <FormHelperText>{errors.role.message}</FormHelperText>
              ) : null}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="sponsor_status"
          render={({ field }) => (
            <FormControl error={Boolean(errors.sponsor_status)}>
              <InputLabel id="demo-simple-select-label">
                Sponsor Status
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sponsor Status"
              >
                <MenuItem value={"Platinum"}>Platinum</MenuItem>
                <MenuItem value={"Gold"}>Gold</MenuItem>
                <MenuItem value={"Silver"}>Silver</MenuItem>
                <MenuItem value={"Bronze"}>Bronze</MenuItem>
              </Select>
              {errors.sponsor_status ? (
                <FormHelperText>{errors.sponsor_status.message}</FormHelperText>
              ) : null}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <FormControl error={Boolean(errors.file)}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <input {...field} type="file" style={{ display: "none" }} />
              </Button>
              {errors.file && (
                <FormHelperText>{errors.file.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button> */}

        <Button
          // disabled={isPending}
          type="submit"
          variant="contained"
          className="bg-primary/80"
        >
          {/* {isPending ? "Loading..." : "Sign up"} */}
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default SpeakersDetailsForm;
