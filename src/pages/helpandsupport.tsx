import Carousel from "@/common/Carousel/Carousel";

import { stepData } from "@/common/StepsContent";
import { Header } from "@/common/Text/Header";
import { CourseStep } from "@/components/Card/CourseStep";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaChevronDown } from "react-icons/fa";
// import ExpandMoreIcon from '@mui/icons-materi
import React from "react";
import { faqData } from "@/common/faqContent";

const Helpandsupport = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div className="my-10">
      
      <Header title="Frequently Asked Questions" />
      <div className=" my-10">
        {faqData?.map((i: any, index: any) => {
          return (
            <Accordion
              expanded={expanded === `panel${i?.id}`}
              onChange={handleChange(`panel${i?.id}`)}
              key={index}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className=" font-bold text-xcool-new-blue">
                  {i?.que}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{i?.ans}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Helpandsupport;
