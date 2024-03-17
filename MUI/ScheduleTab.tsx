"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataTable from "./DataTable";
import ListItem from "@/components/Shared/ListItem";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3, px: 2 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ScheduleTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Keynote Track" {...a11yProps(0)} />
          <Tab label="DevOps Track" {...a11yProps(1)} />
          <Tab label="Security Track" {...a11yProps(2)} />
          <Tab label="Startup/Community Hub" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="border rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="border rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="border rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="border rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
