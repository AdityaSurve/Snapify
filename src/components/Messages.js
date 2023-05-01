import React,{useContext,useState,useEffect} from 'react'
import Message from './Message'
import { Chatcontext } from '../context/notes/Chatcontext';
import '../styling/Chats.css'
import { app, database, storage } from './firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Messages = ({user}) => {
  const [messages, setmessages] = useState([])
  const {data}=useContext(Chatcontext)

  useEffect(() => {
    // const combid=user?.email >data.Chatid ?
    //       user?.email?.substring(0, user?.email.length - 10) + data.Chatid
    //      : data.Chatid + user?.email?.substring(0, user?.email.length - 10)
         const combid=
         data.Chatid>user.uid?
         data.Chatid+user.uid
    :user.uid+data.Chatid
    const unSub=onSnapshot(doc(database,"chats",combid),(doc)=>{
      doc.exists() && setmessages(doc.data().message)
    })

    return ()=>{
      unSub()
    }

  }, [data?.Chatid])
  
  return (
    <div className='messages'>
      {messages.map(m=>{
        return <Message msg={m} key={m?.id}/>
      })}
    </div>
  )
}

export default Messages