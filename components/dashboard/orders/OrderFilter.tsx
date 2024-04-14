import * as React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function OrderFilter({
  selectedTrack: selectedTrack,
  setSelectedTrack: setSelectedTrack,
}: {
  selectedTrack: string | undefined;
  setSelectedTrack: React.Dispatch<React.SetStateAction<string | undefined>>;
}): React.JSX.Element {
  return (
    <Box
      sx={{ p: 2, display: "flex", justifyContent: "end" }}
      className="bg-gray-200 rounded-lg"
    >
      <div className="w-full min-w-20 max-w-32 bg-white">
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
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"presentation-deck"}>Presentation Deck</MenuItem>
            <MenuItem value={"workshop"}>Workshop</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
