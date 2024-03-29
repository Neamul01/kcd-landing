"use client";

import { useUser } from "@/hooks/use-user";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

const user = {
  name: "Sofia Rivers",
  avatar: "/assets/avatar.png",
  jobTitle: "Senior Developer",
  country: "USA",
  city: "Los Angeles",
  timezone: "GTM-7",
} as const;

export function AccountInfo(): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("------file", file);
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const { data, error, loading } = useUser();
  console.log(data);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            {previewImage ? (
              <Avatar
                src={previewImage}
                sx={{ height: "80px", width: "80px" }}
              />
            ) : (
              <Avatar
                src={user.avatar}
                sx={{ height: "80px", width: "80px" }}
              />
            )}
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          style={{ width: "65%", margin: "0 auto" }}
          // onClick={handleFileChange}
        >
          Upload Photo
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
