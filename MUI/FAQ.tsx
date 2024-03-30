"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="rounded-lg border flex flex-col gap-4 px-2 py-6">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            Are Kubernetes Community Days limited to Kubernetes?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No! The Presentations in KCDs cover a wide variety of topics around
            open source and cloud-native technologies. A very basic awareness of
            Cloud and Containers is sufficient to benefit from attending KCD
            Dhaka. Cloud native technologies empower organizations to build and
            run scalable applications in modern, dynamic environments such as
            public, private, and hybrid clouds. Containers, service meshes,
            microservices, immutable infrastructure, and declarative APIs
            exemplify this approach.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>
            Can I transfer my registration to another person if I can’t attend?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Yes. Please write to us</Typography>
          <a
            href="mailto:organizers@kcddhaka.org"
            className="text-primary underline"
          >
            organizers@kcddhaka.org
          </a>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Why should attendees pay for the ticket?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Kubernetes Community Days (KCDs) are community-organized,
            not-for-profit events. Organizing a large-scale, in-person event
            like KCD Dhaka involves considerable cost. Sponsors provide partial
            financial support for the event. The remaining cost is covered by
            tickets.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>What are the benefits of attending KCD Dhaka?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            KCDs are the second favorite event from CNCF, just behind KubeCon.
            In 2022, CNCF supported 16 KCDs across 14 countries, with more than
            6500 attendees. The Speakers cover business issues, tools,
            processes, automation and cloud strategy. Many talks will be about
            how companies relied on open source technologies to modernize Apps
            and Infrastructure. As an attendee you get to connect and
            collaborate with Software Engineers, DevOps Professionals, SREs,
            Cloud Developers, End-users, Vendors, Industry experts and Thought
            leaders.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Is there any cancellation or refund policy?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, unfortunately we don&apos;t have a cancellation or refund
            policy! Once you book your ticket, we are sure you won&apos;t regret
            it!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
