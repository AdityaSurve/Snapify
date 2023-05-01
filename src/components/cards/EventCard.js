import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { app, database, storage } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export default function EventCard() {
  const [hide, sethide] = useState(true)
  const [thons, setthons] = useState([])
  const collectionRef = collection(database, 'events')
  useEffect(() => {
    getEvents();
  }, []);

  const handleAccept=(id)=>{
    console.log(id);
    const doctoupdate = doc(database, 'events', id)
        updateDoc(doctoupdate, {
            accepted:true
        })
  }
  const handleReject=(id)=>{
  }
  
  const auth = getAuth();
  const user = auth.currentUser;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    const getEvents=()=>{
      const nameQuery=query(collectionRef,where("to","==",user.uid))
      onSnapshot(nameQuery,(data)=>{
        setthons(data.docs);
      })
      sethide(true)
    }
    const getoutEvents=()=>{
      const nameQuery=query(collectionRef,where("from","==",user.uid))
      onSnapshot(nameQuery,(data)=>{
        setthons(data.docs);
      })
      sethide(false)
    }
  return (
    <div className="flex flex-col">
      <div className="grid grid-2 gap-8 p-10 justify-center items-center">
        <div className="flex gap-2">
          <button
            className="bg-[#61876E] hover:bg-[#AA5656] border-2  rounded-2xl text-white font-jost py-2 px-4 mt-6 w-[300px] shadow-black shadow-lg hover:scale-110 transition duration-300 ease-in-out"
            onClick={getEvents}
          >
            INCOMING EVENTS
          </button>
          <button
            className="bg-[#61876E] hover:bg-[#AA5656] border-2  rounded-2xl text-white font-jost py-2 px-4 mt-6 w-[300px] shadow-black shadow-lg hover:scale-110 transition duration-300 ease-in-out"
            onClick={getoutEvents}
          >
            OUTGOING EVENTS
          </button>
        </div>
  {
            thons.map((note) => {
                let id=note.id;
                let noted=note.data();
                return <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3bh-content"
      id="panel3bh-header" className='w-[700px]'
    >
      <Typography sx={{ width: '33%', flexShrink: 0 }}>
        {noted.Title}
      </Typography>
      <span className="flex gap-8">
    {hide && <button onClick={()=>{handleAccept(note.id)}} >✓</button>}
      {!note.accepted && <button onClick={handleReject} >X</button>}

      </span>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {noted.desc}
      </Typography>
      <Typography>
        {noted.Location}
      </Typography>
      <Typography>
        By:  {noted.fromname}
      </Typography>
    </AccordionDetails>
  </Accordion>;
              })}

  </div>
  </div>
  )
}
