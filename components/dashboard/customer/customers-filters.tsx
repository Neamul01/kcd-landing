import * as React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function CustomersFilters({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: string | undefined;
  setSelectedRole: React.Dispatch<React.SetStateAction<string | undefined>>;
}): React.JSX.Element {
  return (
    <Box
      sx={{ p: 2, display: "flex", justifyContent: "end" }}
      className="bg-gray-200 rounded-lg"
    >
      <div className="w-full min-w-20 max-w-32 bg-white">
        <FormControl fullWidth>
          <InputLabel size="small" id="demo-simple-select-label">
            Role
          </InputLabel>
          <Select
            fullWidth
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"speaker"}>Speaker</MenuItem>
            <MenuItem value={"organizer"}>Organizer</MenuItem>
            <MenuItem value={"sponsor"}>Sponsor</MenuItem>
            <MenuItem value={"volunteer"}>Volunteer</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
