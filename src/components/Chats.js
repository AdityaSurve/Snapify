import React, { useContext,useState, useEffect } from 'react'
import Openchat from './Openchat';
import Sidebar from './Sidebar';
import '../styling/Chats.css'
import { app, database, storage } from './firebaseConfig'
import { collection, addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where,setDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import Navbar from './Navbar'

const Chats = () => {
  const collectionRef = collection(database, 'users')
  const auth = getAuth();
  const user = auth.currentUser;
    // const context = useContext(notecontext);
    // const { user, getUserdetails } = context;
    const [imagesrc, setimagesrc] = useState("https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png")


  useEffect(() => {
    console.log(user);
    // getUserdetails();
    // getImage();
}, [])

// const getImage=async()=>{
//   const emailQuery=query(collectionRef,where("email","==",user.email))
//   // const imguser=[];
//   // onSnapshot(emailQuery,(data)=>{
//   //     console.log(data.docs.map((item) => {
//   //            return { ...item.data()};
//   //     }));
//   //   })
//   const querySnapshot = await getDocs(emailQuery);
//   querySnapshot.forEach(async(doc) => {
//       await setimagesrc(doc.data().imageURL)
//     });
// }

  return (
    <>
    <Navbar />
    <div className="bg-bannerBg h-screen flex  bg-cover bg-no-repeat">
      
    <div style={{  height: "100vh",marginTop:"40px", width: "100vw",display:"flex", alignItems:"center",justifyContent:"center"}}>
        <div id='chatcont' >
          <Sidebar user={user} imagesrc={imagesrc}/>
          <Openchat user={user}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Chats