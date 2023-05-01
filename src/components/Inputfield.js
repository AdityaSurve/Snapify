import React,{useContext,useEffect,useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Chatcontext } from '../context/notes/Chatcontext';
import { app, database, storage } from './firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where, arrayUnion, Timestamp, serverTimestamp} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuid} from "uuid"
import '../styling/Chats.css'
import { async } from '@firebase/util';
const Inputfield = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [text, settext] = useState("")
  const [img, setImg] = useState(null)
  const {data} = useContext(Chatcontext);

  const handleSend=async()=>{
    if(img){
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on('state_changed', 
        (snapshot) => {
        },
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
        //       const combid=user?.email >data.Chatid ?
        //   user?.email?.substring(0, user?.email.length - 10) + data.Chatid
        //  : data.Chatid + user?.email?.substring(0, user?.email.length - 10)
         const combid=
         data.Chatid>user.uid?
         data.Chatid+user.uid
         :user.uid+data.Chatid 
         console.log(combid);
              await updateDoc(doc(database,"chats",combid),{
                message:arrayUnion({
                  id:uuid(),
                  text,
                  senderid:user.uid,
                  date:Timestamp.now(),
                  img:downloadURL
                })
              })
            });
        });
      
    }
    else{
      // const combid=user?.email >data.Chatid ?
      //     user?.email?.substring(0, user?.email.length - 10) + data.Chatid
      //    : data.Chatid + user?.email?.substring(0, user?.email.length - 10)
         const combid=
         data.Chatid>user.uid?
         data.Chatid+user.uid
         :user.uid+data.Chatid 
         console.log(combid);
      await updateDoc(doc(database,"chats",combid),{
        message:arrayUnion({
          id:uuid(),
          text,
          senderid:user.uid,
          date:Timestamp.now()
        })
      })
    }
  //   const combid=user?.email >data.Chatid ?
  //   user?.email?.substring(0, user?.email.length - 10) + data.Chatid
  //  : data.Chatid + user?.email?.substring(0, user?.email.length - 10)
  const combid=
         data.Chatid>user.uid?
         data.Chatid+user.uid
         :user.uid+data.Chatid
    await updateDoc(doc(database,"userchats",user.uid),{
      
      [combid+".lastmsg"]:{
        text
      },
      [combid+".date"]:serverTimestamp()
    })
    await updateDoc(doc(database,"userchats",data.user.uid),{
      [combid+".lastmsg"]:{
        text
      },
      [combid+".date"]:serverTimestamp()
    })
    settext("")
    setImg(null)
  }

  return (
    <div className='Inputfield'>
      <TextField type="text" id='sendinput' label='Type Something...' multiline onChange={(e)=>settext(e.target.value)} value={text}/>
      <div className="send">
        <img src="" alt="" />
        <input type="file" name="" id="file" style={{ display: "none" }} onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src="" alt="" id='navimg' style={{cursor:"pointer"}}/>
        </label>
        <Button variant="contained" id='send' onClick={handleSend}>Send</Button>
      </div>
    </div>
  )
}

export default Inputfield