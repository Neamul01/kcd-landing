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
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Ticket, Workshop } from "@/types/types";
// import { useUser } from "@/hooks/use-user";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Popover,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import Link from "next/link";
import axiosInstance from "@/lib/Axios";
import { useDetailsStore } from "@/store/useDetailsStore";
import Image from "next/image";

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
  // const { data: user } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [workshops, setWorkshops] = React.useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkspace] = React.useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: React.useMemo(() => {
      return {
        name: "",
        email: "",
        mobile: "",
        address: "",
        tShirt: "",
        terms: false,
        promotion: false,
        track: "",
        workshop: [],
      };
    }, []),
    resolver: zodResolver(schema),
  });
  const { setData, isSubmit, setIsSubmit, setErrors } = useDetailsStore();
  const [workshopLoading, setWorkshopLoading] = React.useState(false);
  const [track, setTrack] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const selectedTShirt = watch("tShirt");

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        if (!values.track) {
          return setError("track", {
            type: "min",
            message: "Please select a track",
          });
        }
        console.log("select a workshop", values?.workshop);
        // @ts-ignore
        if (values.track === "workshop" && values?.workshop?.length <= 0) {
          return setError("workshop", {
            type: "min",
            message: "Please select at least one workshop",
          });
        }
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
              title: selectedTickets?.title as string, //
              price: Number(selectedTickets?.price), //
              quantity: 1, //
              ticket: selectedTickets?._id as string, //
            },
          ],
        };

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
    console.log("is submit", isSubmit);
    if (isSubmit && submitButtonRef.current) {
      // @ts-ignore
      submitButtonRef.current.click();
      setIsSubmit(false);
    }
  }, [isSubmit, errors]);

  // popover ---------------------------

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">{selectedTickets?.title}</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormControl error={Boolean(errors.name)}>
                  <InputLabel size="small">Name</InputLabel>
                  <OutlinedInput
                    size="small"
                    {...field}
                    label="Name"
                    // defaultValue={user?.name}
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
                  <InputLabel size="small">Email address</InputLabel>
                  <OutlinedInput
                    size="small"
                    {...field}
                    label="Email address"
                    type="email"
                  />
                  {errors.email ? (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <FormControl error={Boolean(errors.address)}>
                  <InputLabel size="small">Address</InputLabel>
                  <OutlinedInput size="small" {...field} label="Address" />
                  {errors.address ? (
                    <FormHelperText>{errors.address.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="mobile"
              render={({ field }) => (
                <FormControl error={Boolean(errors.mobile)}>
                  <InputLabel size="small">Mobile</InputLabel>
                  <OutlinedInput
                    size="small"
                    {...field}
                    label="Mobile"
                    type="number"
                  />
                  {errors.mobile ? (
                    <FormHelperText>{errors.mobile.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </div>

          <div className="grid grid-cols-6 gap-2 items-center">
            <Controller
              control={control}
              name="tShirt"
              render={({ field }) => (
                <FormControl
                  className="col-span-4"
                  error={Boolean(errors.tShirt)}
                >
                  <InputLabel size="small" id="demo-simple-select-label">
                    T-Shirt Size
                  </InputLabel>
                  <Select
                    size="small"
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
            <div className="col-span-2">
              <Typography
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                className="cursor-pointer text-center border rounded-lg py-2 text-primary bg-gray-100"
              >
                Size Guide
              </Typography>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Image
                  width={400}
                  height={400}
                  src="/t-shirt-size.png"
                  alt="sizes guide"
                  className="w-full h-full border rounded-b-lg"
                />
              </Popover>
            </div>
          </div>

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
                label={<p className="text-sm">Presentation</p>}
              />
              <FormControlLabel
                value="workshop"
                control={<Radio size="small" className="py-0" />}
                label={<p className="text-sm">Workshop </p>}
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
              <RadioGroup
                aria-label="workshop"
                name="workshop"
                className="flex flex-col gap-1 mt-2"
              >
                {workshops?.map((workshop) => (
                  <div key={workshop._id}>
                    <FormControlLabel
                      disabled={workshop.availability === false}
                      control={
                        <Checkbox
                          size="small"
                          onClick={() => handleWorkshopSelect(workshop._id)}
                          checked={selectedWorkshop.includes(workshop._id)}
                        />
                      }
                      label={
                        <p className="flex items-center">
                          <span className="leading-3 text-sm capitalize">
                            {workshop.title}
                          </span>
                          <span className="text-xs text-black/80 capitalize pl-1">
                            {" "}
                            ({workshop.sessionTime})
                          </span>
                        </p>
                      }
                      value={workshop._id}
                    />
                  </div>
                ))}
                {errors.workshop ? (
                  <FormHelperText error>
                    {errors.workshop.message}
                  </FormHelperText>
                ) : null}
                <FormHelperText>
                  You can select one morning and one afternoon time.
                </FormHelperText>
              </RadioGroup>
            </FormControl>
            // {/* {errors.workshop && (
            //   <FormHelperText>{errors.workshop.message}</FormHelperText>
            // )} */}
          )}
          <Controller
            control={control}
            name="promotion"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  className="!mt-0"
                  control={
                    <Checkbox className="py-0" size="small" {...field} />
                  }
                  label={
                    <p className="text-base mt-0">
                      I would like to receive updates over WhatsApp.
                    </p>
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
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={
                    <Checkbox className="py-0" size="small" {...field} />
                  }
                  label={
                    <p className="text-base">
                      I have read the{" "}
                      <Link
                        target="_blank"
                        href={"/conditions/terms-condition"}
                        className="text-primary underline"
                      >
                        terms and conditions.
                      </Link>
                    </p>
                  }
                />
                {errors.terms ? (
                  <FormHelperText error>{errors.terms.message}</FormHelperText>
                ) : null}
              </div>
            )}
          />
        </Stack>
        <button type="submit" ref={submitButtonRef} style={{ display: "none" }}>
          submit
        </button>
      </form>
    </Stack>
  );
}
