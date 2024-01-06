import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaChevronDown } from "react-icons/fa";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion({ bio, qualification, award }: any) {
  const [showFullText, setShowFullText] = React.useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className=" font-bold text-xcool-new-blue">
            Teacher Bio{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: showFullText ? bio : bio?.slice(0, 1500) || !showFullText ?  bio?.slice(0, 1500):bio ,
              }}
            />
            {bio?.length > 1500 && (
              <span
                onClick={toggleShowFullText}
                className=" text-blue-700 cursor-pointer"
              >
                {showFullText ? "hide more" : "Show More"}
              </span>
            )}
             
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className=" font-bold text-xcool-new-blue">
            Degrees & Certifications
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {qualification?.length > 0 ? (
              <>
                {qualification.map((data: any) => {
                  return (
                    <div key={data?.id} className="flex gap-3">
                      <>
                        <p className=" font-semibold">
                          {data?.university || "University"}
                        </p>{" "}
                        : <p>{data?.cert_id}</p>
                      </>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>Not Available</p>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className=" font-bold text-xcool-new-blue">
            Other Achievement
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {award?.length > 0 ? (
              <>
                {award?.map((data: any, index: any) => {
                  return (
                    <div key={data.id} className="flex gap-3">
                      <p>{data?.cert_id}</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>Not Available</p>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
