import React,{useState,useEffect, useContext} from 'react'
import '../styling/Chats.css'
import { app, database, storage } from './firebaseConfig'
import { collection, addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where,setDoc, serverTimestamp} from "firebase/firestore";
import { async } from '@firebase/util';
import { Chatcontext } from '../context/notes/Chatcontext';


const Userschats = (props) => {
  const {dispatch}=useContext(Chatcontext)
  const {curuser}=props
  const [chats, setchats] = useState([])

  useEffect(() => {
    const getchats=()=>{
      const unsub = onSnapshot(doc(database, "userchats", curuser.uid), (doc) => {
        setchats(doc.data())
    });
    return ()=>{
      unsub();
    };
    }

    curuser.uid && getchats()
  }, [curuser.uid])

  const handleSelect=(user)=>{
    dispatch({type:"CHANGE_USER",payload:user})
  }

  return (
    <div className='userchats'>
      {chats && Object?.entries(chats)?.sort((a,b)=>b[1].date-a[1].date)?.map((chat)=>(
      <div className="userchat" key={chat[0]} onClick={()=>handleSelect(chat[1].userinfo)}>
        <img src={chat[1]?.userinfo?.imageURL} alt="" id='searchimage'/>
        <div className="userchatinfo">
          <span className='span1'>{chat[1]?.userinfo?.name}</span>
          <p className='p1'>{chat[1]?.lastmsg?.text}</p>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Userschats