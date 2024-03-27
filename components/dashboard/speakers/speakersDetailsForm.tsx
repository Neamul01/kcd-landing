"use client";

import * as React from "react";
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
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import axiosInstance from "@/lib/Axios";

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  designation: zod.string().min(1, { message: "Designation is required" }),
  organization: zod.string().min(1, { message: "Organization is required" }),
  role: zod.string().min(1, { message: "Role is required" }).optional(),
  sponsor_status: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: "",
  designation: "",
  organization: "",
  role: "",
  sponsor_status: "",
} satisfies Values;

const SpeakersDetailsForm = () => {
  const [role, setRole] = useState("");
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      console.log("-------------form values", values);
      setIsPending(true);

      const formData = new FormData();

      // Append other form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append the selected image to FormData if available
      if (selectedImage) {
        formData.append("file", selectedImage);
      }
      if (!selectedImage) {
        // setIsPending(false);
        return alert("Please enter a image");
      }

      console.log("form data", formData);

      await axiosInstance
        .post("/participants", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res", res);
          reset();
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
    }
  };
  const handleRoleSelection = (event: SelectChangeEvent<string>) => {
    const selectedRole = event.target.value as string;
    setRole(selectedRole);
    setValue("role", selectedRole); // Set the value for the "role" field using react-hook-form
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("------------file", file);
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
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
                onChange={handleRoleSelection}
              >
                <MenuItem value={"speaker"}>Speaker</MenuItem>
                <MenuItem value={"organizer"}>Organizer</MenuItem>
                <MenuItem value={"sponsor"}>Sponsor</MenuItem>
                <MenuItem value={"volunteer"}>Volunteer</MenuItem>
              </Select>
              {errors.role ? (
                <FormHelperText>{errors.role.message}</FormHelperText>
              ) : null}
            </FormControl>
          )}
        />

        {role === "sponsor" && (
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
                  <MenuItem value={"PLATINUM"}>Platinum</MenuItem>
                  <MenuItem value={"GOLD"}>Gold</MenuItem>
                  <MenuItem value={"SILVER"}>Silver</MenuItem>
                  <MenuItem value={"BRONZE"}>Bronze</MenuItem>
                </Select>
                {errors.sponsor_status ? (
                  <FormHelperText>
                    {errors.sponsor_status.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        )}

        {/* <Controller
          control={control}
          name="file"
          render={({ field }) => ( */}
        {/* <FormControl> */}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          // onClick={handleFileChange}
        >
          Upload file
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Button>
        {/* {errors.file && (
                <FormHelperText>{errors.file.message}</FormHelperText>
              )} */}
        {/* </FormControl> */}
        {/* )}
        /> */}
        {/* Display the uploaded image */}
        {previewImage && (
          <img
            src={previewImage as string}
            alt="Selected"
            style={{ maxWidth: "40%", marginTop: 10 }}
            className=" rounded-lg border-2 border-gray-500"
          />
        )}

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
