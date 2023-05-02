import React from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/cards/EventCard";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import addIcon from "../assets/add.png";

// import Event from '../assets/events.jpg'

export default function Events() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Navbar />

      <div className="bg-eventsbg flex h-screen bg-cover bg-no-repeat min-w-full overflow-y-hidden">
        <div className="flex flex-col  justify-center items-start ">

        <p className="font-jost text-white font-bold text-[75px] md:text-[100px] mt-10 p-10">
          EVENTS
        </p>

        <EventCard />
        </div>
      </div>
    </div>
  );
}
