"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { MenuItem, Select } from "@mui/material";
import Axios from "@/lib/Axios";
import Image from "next/image";
// import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email(),
  mobile: zod
    .string()
    .min(11, { message: "Please enter a valid phone number." })
    .max(12, { message: "Please enter a valid phone number." }),
  gender: zod.string().min(1, { message: "Gender is required" }),
  organization: zod.string().min(1, { message: "Organization is required" }),
  designation: zod.string().min(1, { message: "Designation is required" }),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  organization: "",
  designation: "",
  password: "",
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  // const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [apiError, setAPIError] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
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
        console.log("file", selectedImage);
        // if (!selectedImage) {
        //   // setIsPending(false);
        //   return alert("Please enter a image");
        // }

        console.log("form data", formData);

        await Axios.post("/auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            console.log("res", res);
            const token = res.data.token;
            localStorage.setItem("token", token);
            reset();
            router.replace("/dashboard");
          })
          .catch((err) => {
            console.log("err", err);
            setAPIError(err?.response?.data?.error);
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
    },
    [router, selectedImage, reset]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // Size in MB
      if (fileSize > 2) {
        setImageError("Image size should not exceed 2 MB");
      } else {
        setImageError(null);
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{" "}
          <Link
            component={RouterLink}
            href={paths.auth.signIn}
            underline="hover"
            variant="subtitle2"
          >
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput {...field} label="Name" />
                {errors.name ? (
                  <FormHelperText>{errors.name.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="mobile"
            render={({ field }) => (
              <FormControl error={Boolean(errors.mobile)}>
                <InputLabel>Mobile</InputLabel>
                <OutlinedInput {...field} label="Mobile" type="number" />
                {errors.mobile ? (
                  <FormHelperText>{errors.mobile.message}</FormHelperText>
                ) : null}
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
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"others"}>Others</MenuItem>
                </Select>
                {errors.gender ? (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
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
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {/* For image upload */}
          <FormControl>
            <p>Profile Picture:</p>
            <OutlinedInput
              label="Profile Picture"
              type="file"
              onChange={handleImageChange}
              inputProps={{ id: "file-input" }}
            />
            {imageError && <FormHelperText error>{imageError}</FormHelperText>}
            {/* {imageError?.includes("dimensions") && (
              <p className="text-xs ">
                You can resize{" "}
                <a
                  href="https://imageresizer.com/"
                  className="text-primary underline"
                >
                  here.
                </a>
              </p>
            )} */}
            {selectedImage && (
              <div className="w-full">
                <Image
                  src={previewImage as string}
                  alt="Selected"
                  width={400}
                  height={300}
                  style={{ maxWidth: "100%", marginTop: 10 }}
                  className=" rounded-lg border-2 border-gray-500"
                />
              </div>
            )}
          </FormControl>
          {/* <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? (
                  <FormHelperText error>{errors.terms.message}</FormHelperText>
                ) : null}
              </div>
            )}
          /> */}
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            className="bg-primary/80"
          >
            {isPending ? "Loading..." : "Sign up"}
          </Button>
        </Stack>
      </form>
      {apiError && <Alert color="warning">{apiError}</Alert>}
    </Stack>
  );
}
