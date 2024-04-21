"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from "@/components/Shared/ListItem";
import { styled } from "@mui/material";
import axiosInstance from "@/lib/Axios";
import Loader from "@/components/Shared/Loader";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Speaker {
  _id: string;
  designation: string;
  name: string;
  organization: string;
  title: string;
  photo: string;
  sponsor_link: string;
}

interface Schedule {
  scheduleTime: string;
  title: string;
  description: string;
  scheduleTrack: string;
  speakers: Speaker[];
  _id: string;
  createdAt: string;
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
  const [allSchedule, setAllSchedule] = React.useState<Schedule[]>([]);
  const [loading, setLoading] = React.useState(false);

  // fetch all schedule here
  const fetchAllSchedule = async () => {
    try {
      setLoading(true);
      let url = "/schedules";

      const response = await axiosInstance.get(url);
      const formattedData: Schedule[] = response.data.data.map(
        (participant: Schedule) => participant
      );
      setAllSchedule(formattedData);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchAllSchedule();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // console.log(allSchedule);
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
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="border rounded-lg">
            {allSchedule
              .filter((schedule) => schedule.scheduleTrack === "keynote-track")
              .map((scheduleItem) => (
                <ListItem key={scheduleItem._id} item={scheduleItem} />
              ))}
            {allSchedule.filter(
              (schedule) => schedule.scheduleTrack === "keynote-track"
            ).length === 0 && (
              <p className="text-secondary text-center p-4">Currently, No schedule here!</p>
            )}
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="border rounded-lg">
            {allSchedule
              .filter((schedule) => schedule.scheduleTrack === "devops-track")
              .map((scheduleItem) => (
                <ListItem key={scheduleItem._id} item={scheduleItem} />
              ))}
            {allSchedule.filter(
              (schedule) => schedule.scheduleTrack === "devops-track"
            ).length === 0 && (
              <p className="text-secondary text-center p-4">Currently, No schedule here!</p>
            )}
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="border rounded-lg">
            {allSchedule
              .filter((schedule) => schedule.scheduleTrack === "security-track")
              .map((scheduleItem) => (
                <ListItem key={scheduleItem._id} item={scheduleItem} />
              ))}
            {allSchedule.filter(
              (schedule) => schedule.scheduleTrack === "security-track"
            ).length === 0 && (
              <p className="text-secondary text-center p-4">Currently, No schedule here!</p>
            )}
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="border rounded-lg">
            {allSchedule
              .filter(
                (schedule) => schedule.scheduleTrack === "startup-community-hub"
              )
              .map((scheduleItem) => (
                <ListItem key={scheduleItem._id} item={scheduleItem} />
              ))}
            {allSchedule.filter(
              (schedule) => schedule.scheduleTrack === "startup-community-hub"
            ).length === 0 && (
              <p className="text-secondary text-center p-4">Currently, No schedule here!</p>
            )}
          </div>
        )}
      </CustomTabPanel>
    </Box>
  );
}
