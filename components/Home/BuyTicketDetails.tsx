"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IoMdEye as EyeIcon, IoMdEyeOff as EyeSlashIcon } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Order, Ticket } from "@/types/types";
import { useUser } from "@/hooks/use-user";
import { Checkbox, FormControlLabel, MenuItem, Select } from "@mui/material";
import Link from "next/link";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  name: zod.string().min(1, { message: "Name is required" }),
  mobile: zod.string().min(1, { message: "Mobile number is required" }),
  address: zod.string().min(1, { message: "Address is required" }),
  // designation: zod.string().min(1, { message: "Designation is required" }),
  // organization: zod.string().min(1, { message: "Organization is required" }),
  tShirt: zod.string().min(1, { message: "Organization is required" }),
  promotion: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions")
    .optional(),
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

type Values = zod.infer<typeof schema>;

export default function BuyTicketDetails({
  selectedTickets,
  setOrderDetails,
}: {
  selectedTickets: Ticket | undefined;
  setOrderDetails: React.Dispatch<React.SetStateAction<Order | undefined>>;
}) {
  const router = useRouter();

  const { data: user } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: React.useMemo(() => {
      return {
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        address: "",
        tShirt: "",
        terms: false,
        promotion: false,
      };
    }, [user]),
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        setIsPending(true);

        const submitData = {
          name: values.name, //
          email: values.email, //
          phone: {
            number: values.mobile, //
            promotion: values.promotion, //
          },
          // track: values.
          // workshop:
          tshirt: values.tShirt, //
          // description:
          address: values.address, //
          // tax:
          // shippingFee:
          cartItems: [
            {
              title: selectedTickets?.title, //
              price: selectedTickets?.price, //
              quantity: selectedTickets?.quantity, //
              ticket: selectedTickets?._id, //
            },
          ],
        };

        // Reset form
        reset();
      } catch {
        () => alert("Something went wrong please try again");
      } finally {
        setIsPending(false);
      }
    },
    [setOrderDetails, reset]
  );

  React.useEffect(() => {
    reset({
      address: "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      name: user?.name || "",
    });
  }, [user]);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">{selectedTickets?.title}</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  {...field}
                  readOnly
                  label="Name"
                  defaultValue={user?.name}
                />
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
                <OutlinedInput
                  {...field}
                  readOnly
                  label="Email address"
                  type="email"
                />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <FormControl error={Boolean(errors.address)}>
                <InputLabel>Address</InputLabel>
                <OutlinedInput {...field} label="Address" />
                {errors.address ? (
                  <FormHelperText>{errors.address.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="tShirt"
            render={({ field }) => (
              <FormControl error={Boolean(errors.tShirt)}>
                <InputLabel id="demo-simple-select-label">
                  T-Shirt Size
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="T-Shirt Size"
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
                {errors.tShirt ? (
                  <FormHelperText>{errors.tShirt.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="promotion"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I would like to receive updates over WhatsApp.
                    </React.Fragment>
                  }
                />
                {errors.promotion ? (
                  <FormHelperText error>
                    {errors.promotion.message}
                  </FormHelperText>
                ) : null}
              </div>
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
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the{" "}
                      <Link
                        href={"/conditions/terms-condition"}
                        className="text-primary underline"
                      >
                        terms and conditions
                      </Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? (
                  <FormHelperText error>{errors.terms.message}</FormHelperText>
                ) : null}
              </div>
            )}
          />
        </Stack>
      </form>
    </Stack>
  );
}
