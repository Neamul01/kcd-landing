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
import { Order, Ticket, Workshop } from "@/types/types";
import { useUser } from "@/hooks/use-user";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import Link from "next/link";
import axiosInstance from "@/lib/Axios";
import { useDetailsStore } from "@/store/useDetailsStore";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  name: zod.string().min(1, { message: "Name is required" }),
  mobile: zod.string().min(1, { message: "Mobile number is required" }),
  address: zod.string().min(1, { message: "Address is required" }),
  tShirt: zod.string().min(1, { message: "Organization is required" }),
  promotion: zod.boolean().optional(),
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
  track: zod
    .string()
    .min(1, { message: "Track selection is required" })
    .optional(),
  workshop: zod.array(zod.string()).optional(),
});

type Values = zod.infer<typeof schema>;

export default function BuyTicketDetails({
  selectedTickets,
}: {
  selectedTickets: Ticket | undefined;
}) {
  const router = useRouter();
  const submitButtonRef = React.useRef(null);
  const { data: user } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [workshops, setWorkshops] = React.useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkspace] = React.useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
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
        track: "",
      };
    }, [user]),
    resolver: zodResolver(schema),
  });
  const [workshopLoading, setWorkshopLoading] = React.useState(false);
  const [track, setTrack] = React.useState("");
  const { setData, isSubmit, setIsSubmit, setErrors } = useDetailsStore();

  const selectedTShirt = watch("tShirt");

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
          description: "Test Payment",
          track: values.track,
          workshop: values.workshop,
          tshirt: values.tShirt, //
          address: values.address, //
          cartItems: [
            {
              title: selectedTickets?.title, //
              price: selectedTickets?.price, //
              quantity: 1, //
              ticket: selectedTickets?._id, //
            },
          ],
        };

        console.log("selectedWorkshop", selectedWorkshop);
        console.log("values", submitData);
        setData(submitData);
      } catch {
        () => alert("Something went wrong please try again");
      } finally {
        setIsPending(false);
      }
    },
    [reset]
  );

  const handleTrackSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedTrack = event.target.value;

    setTrack(selectedTrack);
    setValue("track", selectedTrack);

    if (selectedTrack === "workshop") {
      try {
        setWorkshopLoading(true);
        const response = await axiosInstance("/workshops");
        if (!response.data) {
          throw new Error("Failed to fetch workshops");
        }
        console.log("workshops", response.data.data);

        setWorkshops(response.data.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setWorkshopLoading(false);
      }
    } else {
      setWorkshopLoading(false);
      // Reset workshops if "Presentation" is selected
      setWorkshops([]);
    }
  };

  const handleWorkshopSelect = (workshopId: string) => {
    console.log("workshop id", workshopId);
    setSelectedWorkspace((prevSelected) => {
      if (prevSelected.includes(workshopId)) {
        // Remove workshopId if already present
        const updatedSelected = prevSelected.filter((id) => id !== workshopId);
        setValue("workshop", updatedSelected); // Set the updated array
        return updatedSelected;
      } else {
        // Add workshopId if not present
        const updatedSelected = [...prevSelected, workshopId];
        setValue("workshop", updatedSelected); // Set the updated array
        return updatedSelected;
      }
    });
  };

  React.useEffect(() => {
    reset({
      address: "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      name: user?.name || "",
    });
  }, [user, reset]);

  React.useEffect(() => {
    console.log("is submit", isSubmit);
    if (isSubmit && submitButtonRef.current) {
      // @ts-ignore
      submitButtonRef.current.click();
      setIsSubmit(false);
    }
  }, [isSubmit, errors]);

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
                  <MenuItem value={"S"}>S</MenuItem>
                  <MenuItem value={"M"}>M</MenuItem>
                  <MenuItem value={"L"}>L</MenuItem>
                  <MenuItem value={"XL"}>XL</MenuItem>
                  <MenuItem value={"2XL"}>2XL</MenuItem>
                </Select>
                {errors.tShirt ? (
                  <FormHelperText>{errors.tShirt.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          {selectedTShirt && (
            <img
              src="/t-shirt-size.png"
              alt="sizes guide"
              className="w-full h-full"
            />
          )}

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

          {/* Track selection */}
          <FormControl error={Boolean(errors.track)}>
            <p>Choose your preferred track to make the most of your day!</p>
            <RadioGroup
              aria-label="track"
              name="track"
              onChange={handleTrackSelection}
              className=""
            >
              <FormControlLabel
                value="presentation-deck"
                control={<Radio size="small" />}
                label="Presentation"
              />
              <FormControlLabel
                value="workshop"
                control={<Radio size="small" />}
                label="Workshop"
              />
            </RadioGroup>
            {errors.track && (
              <FormHelperText>{errors.track.message}</FormHelperText>
            )}
          </FormControl>

          {/* Workshop selection */}
          {workshopLoading && (
            <p className="text-xs text-primary">Loading...</p>
          )}
          {workshops && workshops?.length > 0 && (
            <FormControl className="pl-2 md:pl-5 !mt-0">
              <RadioGroup aria-label="workshop" name="workshop">
                {workshops?.map((workshop) => (
                  <div key={workshop._id}>
                    <FormControlLabel
                      onClick={() => handleWorkshopSelect(workshop._id)}
                      control={
                        <Checkbox
                          size="small"
                          onClick={() => handleWorkshopSelect(workshop._id)}
                          checked={selectedWorkshop.includes(workshop._id)}
                        />
                      }
                      label={workshop.title}
                      value={workshop._id}
                    />
                    {errors.workshop ? (
                      <FormHelperText error>
                        {errors.workshop.message}
                      </FormHelperText>
                    ) : null}
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            // {/* {errors.workshop && (
            //   <FormHelperText>{errors.workshop.message}</FormHelperText>
            // )} */}
          )}

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
        {/* <button type="submit" ref={submitButtonRef} style={{ display: "none" }}> */}
        <button type="submit" ref={submitButtonRef}>
          submit
        </button>
      </form>
    </Stack>
  );
}
