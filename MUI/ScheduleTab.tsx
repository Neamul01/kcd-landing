"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from "@/components/Shared/ListItem";
import { styled } from "@mui/material";

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

const AntTab = styled((props: any) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#fff",
      background: theme.palette.primary.main,
      borderRadius: 6,
      borderBottom: 0,
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

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
      <Box className="mb-6 max-w-[350px] md:max-w-full mx-auto lg:w-sectionLayout ">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          // aria-label="basic tabs example"
        >
          <AntTab
            className="text-sm md:text-base"
            label="Keynote Track"
            {...a11yProps(0)}
          />
          <AntTab
            className="text-sm md:text-base"
            label="DevOps Track"
            {...a11yProps(1)}
          />
          <AntTab
            className="text-sm md:text-base"
            label="Security Track"
            {...a11yProps(2)}
          />
          <AntTab
            className="text-sm md:text-base"
            label="Startup/Community Hub"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="border rounded-lg">
          {/* {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))} */}
          <h2 className="text-center text-2xl">Coming soon..</h2>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="border rounded-lg">
          {/* {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))} */}
          <h2 className="text-center text-2xl">Coming soon..</h2>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="border rounded-lg">
          {/* {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))} */}
          <h2 className="text-center text-2xl">Coming soon..</h2>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="border rounded-lg">
          {/* {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} />
          ))} */}
          <h2 className="text-center text-2xl">Coming soon..</h2>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
