import * as React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function OrderFilter({
  selectedTrack,
  setSelectedTrack,
  setSelectedStatus,
  selectedStatus,
}: {
  selectedTrack: string | undefined;
  setSelectedTrack: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedStatus: string | undefined;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
}): React.JSX.Element {
  return (
    <Box
      sx={{ p: 2, display: "flex", justifyContent: "end" }}
      className="bg-gray-200 rounded-lg"
    >
      <div className="flex gap-3 items-center">
        <div className="min-w-20 w-32 bg-white">
          {/* ['pending', 'initiated', 'failed', 'paid', 'canceled', 'refunded'] */}
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Status
            </InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {/* ['presentation-deck', 'workshop'] */}
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"initiated"}>Initiated</MenuItem>
              <MenuItem value={"failed"}>Failed</MenuItem>
              <MenuItem value={"paid"}>Paid</MenuItem>
              <MenuItem value={"canceled"}>Canceled</MenuItem>
              <MenuItem value={"refunded"}>Refunded</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="min-w-20 w-32 bg-white">
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Track
            </InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Track"
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
            >
              {/* ['presentation-deck', 'workshop'] */}
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"presentation-deck"}>Presentation Deck</MenuItem>
              <MenuItem value={"workshop"}>Workshop</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </Box>
  );
}
