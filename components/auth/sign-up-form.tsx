"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { authClient } from "@/lib/auth/client";
import { MenuItem, Select } from "@mui/material";
import Axios from "@/lib/Axios";
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
  role: zod.string().min(1, { message: "Role is required" }),
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
  role: "user",
  password: "",
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  // const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      // setIsPending(true);

      // console.log("values", values);

      const res = await Axios.post("/auth/register", values);

      console.log("res", res);
      const token = res.data.token;
      localStorage.setItem("token", token);
      reset();
      router.push("/dashboard");
      // const { error } = await authClient.signUp(values);

      // if (error) {
      //   setError("root", { type: "server", message: error });
      //   setIsPending(false);
      //   return;
      // }

      // Refresh the auth state
      // await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [router, setError]
  );

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
          {/* <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <FormControl error={Boolean(errors.role)}>
                <InputLabel>role</InputLabel>
                <OutlinedInput {...field} label="role" />
                {errors.role ? (
                  <FormHelperText>{errors.role.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          /> */}
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
            Sign up
          </Button>
        </Stack>
      </form>
      {/* <Alert color="warning">Created users are not persisted</Alert> */}
    </Stack>
  );
}
