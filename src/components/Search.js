import React,{useState} from 'react'
import '../styling/Chats.css'
import TextField from '@mui/material/TextField';
import { app, database, storage } from './firebaseConfig'
import { collection, addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where,setDoc, serverTimestamp} from "firebase/firestore";
import { async } from '@firebase/util';

const Search = (props) => {
  const {curuser,imagesrc}=props
  const [username, setusername] = useState("")
  const [user, setuser] = useState(null)
  const [err, seterr] = useState(false)
  const collectionRef = collection(database, 'users')

  const handleSearch= async ()=>{
    const nameQuery=query(collectionRef,where("name","<=",username+ '\uf8ff'))
    try{
    const querySnapshot = await getDocs(nameQuery);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setuser(doc.data())
      });
    }
    catch{
      seterr(true)
    }
  }

  const handleKey=(e)=>{
    (e.code==="Enter") && handleSearch()
  };

  const handleSelect=async()=>{
    //check whether group exists chats in firebase if not create
    // const combid=
    // curuser.email>user.email?
    // curuser.email.substring(0, curuser.email.length-10)+user.email.substring(0, user.email.length-10)
    // :user.email.substring(0, user.email.length-10)+curuser.email.substring(0, curuser.email.length-10)
    const combid=
    curuser.uid>user.uid?
    curuser.uid+user.uid
    :user.uid+curuser.uid
    try{
      const res=await getDoc(doc(database,"chats",combid))
      console.log(res.exists());
      if(!res.exists()){
        //create chats
        await setDoc(doc(database,"chats",combid),{
          message:[]
        })
        console.log(curuser);
        console.log(user);
        console.log(imagesrc);
        //create userchats
        updateDoc(doc(database,"userchats",curuser.uid),{
          [combid+".userinfo"]:{
            uid:user.uid,
            email:user.email,
            name:user.name,
            // imageURL:user.imageURL
            imageURL:imagesrc
          },
          [combid+".date"]:serverTimestamp()
        })
        updateDoc(doc(database,"userchats",user.uid),{
          [combid+".userinfo"]:{
            uid:curuser.uid,
            email:curuser.email,
            name:curuser.displayName,
            imageURL:imagesrc
          },
          [combid+".date"]:serverTimestamp()
        })
      }
    }
    catch(err){
    }
    
setuser(null)
setusername("")
  }
  return (
    <div id='search'>

      <div className="searchform">
        <TextField type="text" id='searchinput' label='Find a user' onChange={e=>setusername(e.target.value)} onKeyDown={handleKey} value={username}/>
      </div>
      {err && <span> User not found!</span>}
      {user && <div className="userchat" onClick={handleSelect}>
        <img src={user.imageURL} alt="" id='searchimage'/>
        <div className="userchatinfo">
          <span className='span1'>{user.name}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search