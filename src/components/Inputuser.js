import { useState,useEffect } from "react";
import React from 'react'
import { app, database, storage } from './firebaseConfig'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";

import { collection, addDoc, getDocs,getDoc, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Inputuser = () => {
  const auth = getAuth();
  const collectionRef = collection(database, 'users')

  const [data, setdata] = useState({});

  let googleProv = new GoogleAuthProvider()


  //query 
  const nameQuery=query(collectionRef,where("name","==","Martin"))


  //login state authtoken
  useEffect(() => {
    onAuthStateChanged(auth,(data)=>{
      console.log(data);
    })
    //logged in or not
    if(data){
      alert("logged in")
    }
    else{
      alert("logged out")
    }
  }, [])

  const handleLogin=()=>{
    signInWithEmailAndPassword(auth, data.email, data.password)
  }

  const handleLogout=()=>{
    signOut(auth);
  }
  

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }

  const handleSubmit1 = () => {
    // createUserWithEmailAndPassword(auth, data.email, data.password)
    // signInWithEmailAndPassword(auth, data.email, data.password)
    signInWithPopup(auth, googleProv) //google pop up
      .then((userCredential) => {
        // // Signed in 
        const user=userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  }

  //add user data to db

  const handleSubmit = () => {
    addDoc(collectionRef, {
      name: data.name,
      email: data.email
    })
      .then(() => {
        alert("data added");
      })
      .catch((err) => {
        console.log(err.message);
      })

  }

  //file input
  const handleStorage = () => {
    console.log(data);
    const storageRef = ref(storage, `images/${data.name}`);
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
     console.log(error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    } )
    
  }

  const getData = () => {
    // getDocs(collectionRef)
    //   .then((res) => {
    //     console.log(res.docs.map((item) => {
    //       return { ...item.data(), id: item.id };
    //     }));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   })


    //for realtime updates
    // onSnapshot(collectionRef,(data)=>{
    //   console.log(data.docs.map((item) => {
    //          return { ...item.data()};
    //   }));
    // })

    //getdata with query
    onSnapshot(nameQuery,(data)=>{
      console.log(data.docs.map((item) => {
             return { ...item.data()};
      }));
    })
  }



  const getFood = () => {
    getDocs(collectionRef)
      .then((res) => {
        (res.docs.map((item) => {
          food.push ({ ...item.data()});
        }));
        console.log("hi");
        console.log(food);
        
      })
      .catch((err) => {
        console.log(err.message);
      })
    }

  const updateData = () => {
    const doctoupdate = doc(database, 'users', '2sgbEfh0T393ZzZIH208')
    updateDoc(doctoupdate, {
      password: "shalala"
    })
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const deleteData = () => {
    const doctoupdate = doc(database, 'users', '2sgbEfh0T393ZzZIH208')
    deleteDoc(doctoupdate)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <div>
       {/* <input type='text' name="name" onChange={(event) => handleInput(event)} /> */}
       <input type='text' name="email" onChange={(event) => handleInput(event)} />
      <input type='password' name="password" onChange={(event) => handleInput(event)} />

      {/* <input type='file' name="file" onChange={(event) => setdata(event.target.files[0])} /> */}
      <button type='submit' onClick={handleLogin} name='submit' >login</button>
      <button type='submit' onClick={handleLogout} name='submit' >logout</button>
    </div>
  )
}

export default Inputuser