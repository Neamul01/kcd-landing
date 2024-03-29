"use client";

import axiosInstance from "@/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHelperText, MenuItem, Select, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  email: zod.string().min(1, { message: "Email is required" }),
  mobile: zod.string().min(1, { message: "Phone is required" }),
  gender: zod.string().min(1, { message: "Gender is required" }),
  designation: zod.string().min(1, { message: "Designation is required" }),
  organization: zod.string().min(1, { message: "Organization is required" }),
});

const defaultValues = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  designation: "",
  organization: "",
};

export function AccountDetailsForm() {
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
      console.log("form values: ", values);
      setIsPending(true);

      const formData = new FormData();

      // Append other form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // // Append the selected image to FormData if available
      // if (selectedImage) {
      //   formData.append("file", selectedImage);
      // }
      // if (!selectedImage) {
      //   // setIsPending(false);
      //   return alert("Please enter a image");
      // }

      console.log("form data", formData);

      await axiosInstance
        .put("/auth/update-details", formData)
        .then((res) => {
          console.log("res", res.data);
          // setSelectedImage(null);
          reset();
        })
        .catch((err) => {
          console.log("err", err);
          alert("Something went wrong please try again");
        })
        .finally(() => {
          setIsPending(false);
          alert("Your data has been saved successfully.");
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
          name="email"
          render={({ field }) => (
            <FormControl error={Boolean(errors.email)}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput {...field} label="Email" />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="mobile"
          render={({ field }) => (
            <FormControl error={Boolean(errors.mobile)}>
              <InputLabel>Mobile</InputLabel>
              <OutlinedInput {...field} label="Mobile" />
              {errors.mobile && (
                <FormHelperText>{errors.mobile.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <FormControl error={Boolean(errors.gender)}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                // onChange={handleRoleSelection}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
              {errors.gender ? (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              ) : null}
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

        <Button
          // disabled={isPending}
          type="submit"
          variant="contained"
          className="bg-primary/80"
        >
          {isPending ? "Loading..." : "Save Data"}
        </Button>
      </Stack>
    </form>
  );
}
