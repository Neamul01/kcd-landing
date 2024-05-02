"use client";

import axiosInstance from "@/lib/Axios";
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
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z as zod } from "zod";
import { Participant } from "./ParticipantsTable";
import Image from "next/image";
import { participantsEnums } from "@/constants/participants";

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  designation: zod.string().min(1, { message: "Designation is required" }),
  organization: zod.string().min(1, { message: "Organization is required" }),
  role: zod.string().min(1, { message: "Role is required" }).optional(),
  sponsor_status: zod.string().optional(),
  sponsor_link: zod.string().min(1, { message: "Sponsor Link is required" }),
  speaking_topic: zod.string().optional(),
  displayId: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

// type Roles =
//   | "organizer"
//   | "sponsor"
//   | "speaker"
//   | "key-note-speaker"
//   | "event-speaker"
//   | "volunteer";

const SpeakersDetailsForm = ({
  selectedParticipant,
  closeModal,
}: {
  selectedParticipant?: Participant;
  closeModal?: () => void;
}) => {
  const [role, setRole] = useState("");
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // const [responseData, setResponseData] = useState<MyData | null>(null);

  const [updateImage, setUpdateImage] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedParticipant?.name || "",
      designation: selectedParticipant?.designation || "",
      organization: selectedParticipant?.organization || "",
      role: selectedParticipant?.role || "",
      sponsor_status: selectedParticipant?.sponsor_status || "",
      sponsor_link: selectedParticipant?.sponsor_link || "",
      speaking_topic: selectedParticipant?.speaking_topic || "",
      displayId: selectedParticipant?.displayId || "",
    },
    resolver: zodResolver(schema),
  });
  const selectedRole = watch("role");

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      console.log("form values", values);
      setIsPending(true);

      const formData = new FormData();

      // Append other form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      // Append the selected image to FormData if available
      if (selectedImage) {
        formData.append("file", selectedImage);
      }
      // if (!selectedImage) {
      //   // setIsPending(false);
      //   return alert("Please enter a image");
      // }

      console.log("form data", formData);

      if (selectedParticipant && closeModal) {
        // ----------------edit form
        console.log("edit form");
        return await axiosInstance
          .put(`/participants/${selectedParticipant._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toast.success("Participant Updated Successfully.");
            console.log("res", res);
            setSelectedImage(null);
            setPreviewImage(null);
            reset();
          })
          .catch((err) => {
            console.log("err", err);
            toast.error("Something went wrong please try again.");
            // alert("Something went wrong please try again");
          })
          .finally(() => {
            setIsPending(false);
            closeModal();
          });
      }
      console.log("add form");

      await axiosInstance
        .post("/participants", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success("Participant Added Successfully.");
          console.log("res", res);
          // setResponseData(res.data);
          setSelectedImage(null);
          setPreviewImage(null);
          reset();
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Something went wrong please try again.");
          // alert("Something went wrong please try again");
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    console.log("------------file", file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      if (selectedParticipant) {
        const fileForm = new FormData();
        fileForm.append("file", file);
        await axiosInstance
          .put(`/participants/${selectedParticipant._id}/photo`, fileForm)
          .catch(() =>
            toast.error("Error when updating image, please try again later.")
          );
        return;
      }

      setSelectedImage(file);
    }
  };

  React.useEffect(() => {
    if (selectedParticipant) {
      reset({
        designation: selectedParticipant.designation,
        name: selectedParticipant.name,
        organization: selectedParticipant.organization,
        role: selectedParticipant.role,
        sponsor_link: selectedParticipant.sponsor_link,
        sponsor_status: selectedParticipant.sponsor_status,
        speaking_topic: selectedParticipant.speaking_topic,
      });
      setUpdateImage(selectedParticipant.photo);
      // @ts-ignore
      setSelectedImage(selectedParticipant.photo);
    }
  }, [selectedParticipant, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel size="small">Name</InputLabel>
                <OutlinedInput size="small" {...field} label="Name" />
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
                <InputLabel size="small">Designation</InputLabel>
                <OutlinedInput size="small" {...field} label="Designation" />
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
                <InputLabel size="small">Organization</InputLabel>
                <OutlinedInput size="small" {...field} label="Organization" />
                {errors.organization ? (
                  <FormHelperText>{errors.organization.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <FormControl error={Boolean(errors.role)}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Role
                </InputLabel>
                <Select
                  {...field}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  onChange={handleRoleSelection}
                >
                  <MenuItem value={"key-note-speaker"}>
                    Keynote Speaker
                  </MenuItem>
                  <MenuItem value={participantsEnums.eventSpeaker}>
                    Event Speaker
                  </MenuItem>
                  <MenuItem value={participantsEnums.panelSpeaker}>
                    Panel Speaker
                  </MenuItem>
                  <MenuItem value={participantsEnums.organizer}>
                    Organizer
                  </MenuItem>
                  <MenuItem value={participantsEnums.sponsor}>Sponsor</MenuItem>
                  <MenuItem value={participantsEnums.volunteer}>
                    Volunteer
                  </MenuItem>
                  <MenuItem value={participantsEnums.fellowShip}>
                    Fellowship
                  </MenuItem>
                </Select>
                {errors.role ? (
                  <FormHelperText>{errors.role.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          {(selectedRole === "event-speaker" ||
            selectedRole === "key-note-speaker") && (
            <Controller
              control={control}
              name="speaking_topic"
              render={({ field }) => (
                <FormControl error={Boolean(errors.speaking_topic)}>
                  <InputLabel size="small">speaking topic</InputLabel>
                  <OutlinedInput
                    size="small"
                    {...field}
                    // value={selectedParticipant?.speaking_topic || ""}
                    label="speaking topic"
                  />
                  {errors.speaking_topic ? (
                    <FormHelperText>
                      {errors.speaking_topic.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          )}

          {role === "sponsor" && (
            <Controller
              control={control}
              name="sponsor_status"
              render={({ field }) => (
                <FormControl error={Boolean(errors.sponsor_status)}>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Sponsor Status
                  </InputLabel>
                  <Select
                    {...field}
                    size="small"
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
          <Controller
            control={control}
            name="sponsor_link"
            render={({ field }) => (
              <FormControl error={Boolean(errors.sponsor_link)}>
                <InputLabel size="small">
                  Sponsor Link (LinkedIn/URL)
                </InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  // value={selectedParticipant?.sponsor_link || ""}
                  label="Sponsor Link (LinkedIn/URL)"
                />
                {errors.sponsor_link ? (
                  <FormHelperText>{errors.sponsor_link.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </div>
        <div>
          {(selectedRole === "event-speaker" ||
            selectedRole === "key-note-speaker" ||
            selectedRole === participantsEnums.panelSpeaker ||
            selectedRole === "organizer") && (
            <Controller
              control={control}
              name="displayId"
              render={({ field }) => (
                <FormControl error={Boolean(errors.displayId)}>
                  <InputLabel size="small">displayId</InputLabel>
                  <OutlinedInput
                    type="number"
                    size="small"
                    {...field}
                    label="displayId"
                  />
                  {errors.displayId ? (
                    <FormHelperText>{errors.displayId.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            // onClick={handleFileChange}
            className="!bg-primary/60"
          >
            Upload photo
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              className="bg-primary/60"
            />
          </Button>
          <p className="text-sm text-accent/80">
            {" "}
            {selectedRole === "event-speaker" ||
              (selectedRole === "key-note-speaker" &&
                "Speaker image size 160x216, please follow the resolution.")}
            {selectedRole === "organizer" &&
              "Organizer image size 160x216, please follow the resolution."}
            {selectedRole === "sponsor" &&
              "Sponsor image size 240x111, please follow the resolution."}
            {selectedRole === "volunteer" &&
              "Volunteer image size 160x216, please follow the resolution."}
            {!selectedRole &&
              "Please select `Role` to see image resolution guide."}
          </p>
        </div>

        {/* Display the uploaded image */}
        {updateImage && (
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${updateImage}`}
            alt="Participant image"
            style={{ maxWidth: "40%", marginTop: 10 }}
            width={300}
            height={250}
            className=" rounded-lg border-2 border-gray-500"
          />
        )}
        {previewImage && (
          <Image
            width={300}
            height={250}
            src={previewImage as string}
            alt="Selected Image"
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
          Add
        </Button>
      </Stack>
    </form>
  );
};

export default SpeakersDetailsForm;
