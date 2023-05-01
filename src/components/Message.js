import React,{useContext,useEffect,useState,useRef} from 'react'
import '../styling/Chats.css'
import { Chatcontext } from '../context/notes/Chatcontext';
import { app, database, storage } from './firebaseConfig'
import { collection, addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where,setDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";

const Message = (props) => {
  
  const {msg}=props
  const date = msg.date.toDate();
const utcString = date.toUTCString();
  const [imagesrc, setimagesrc] = useState("https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png")
  const {data} = useContext(Chatcontext);
  const auth = getAuth();
  const user = auth.currentUser;
  const ref=useRef()

  useEffect(() => {
    // getImage();
    ref.current?.scrollIntoView({behavior:"smooth"})
}, [msg])

// const getImage=async()=>{
//   const collectionRef = collection(database, 'users')
//   const emailQuery=query(collectionRef,where("uid","==",user.uid))
//   const querySnapshot = await getDocs(emailQuery);
//   querySnapshot.forEach(async(doc) => {
//       setimagesrc(doc.data().imageURL)
//     });
// }
  return (
    <div ref={ref} className={`Message ${msg.senderid===user.uid && "owner"}`}>
      <div className="messageinfo">
        <img id="navimg" src={msg.senderid===user.uid ? imagesrc:data?.user?.imageURL} alt="" />
        <span style={{"font-size":"10px"}}>{utcString.substring(0,utcString.length-13)}</span>
        <span style={{"font-size":"10px"}}>{utcString.substring(utcString.length-13,utcString.length)}</span>
      </div>
      <div className="messagecontowner">
        {msg.text!=""&& <p className='textowner'>{msg.text}</p>}
        {msg.img && <img id="navimg1" src={msg.img} alt="" />}
      </div>
    </div>
  )
}

export default Message