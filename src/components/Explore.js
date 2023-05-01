import { app, database, storage } from "./firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Post } from "./cards/Post";
import { React, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
export const Explore = ({ newid, setnewid }) => {
  const [cardarr, setcardarr] = useState([]);
  const [ids, setids] = useState([]);
  const [ind, setind] = useState(0);
  const getImages = async () => {
    const collectionRef = collection(database, "images");
    var arr = [];
    await getDocs(collectionRef).then((res) => {
      console.log(res);
      res.docs.map((item) => {
        arr.push({ array: item.data(), id: item.id });
        console.log(item.id);
      });
    });

    var tags = [];
    var arrar = [];

    await getDocs(collectionRef).then((res) => {
      res.docs.map((item) => {
        item.data().tags.map((tagitem) => {
          if (tags.includes(tagitem)) {
            var ind = tags.indexOf(tagitem);
            // console.log(ind);
            arrar[ind].push({ array: item.data(), id: item.id });
          } else {
            tags.push(tagitem);
            //   arrar.push(tagitem);

            //   console.log(ind)
            arrar[arrar.length] = [{ array: item.data(), id: item.id }];
          }
          // console.log(arrar)
        });
      });
    });
    var newarr = [];
    newarr[0] = arr;
    var newtag = [];
    newtag[0] = { label: "all", ind: 0 };
    arrar.map((item, index) => {
      newarr[index + 1] = item;
      newtag[index + 1] = { label: tags[index], ind: index + 1 };
    });
    console.log(newarr, newtag);

    //   console.log(arrar);
    //   console.log(tags);
    setcardarr([...newarr]);
    setids([...newtag]);
  };
  console.log(cardarr);
  useEffect(() => {
    getImages();
  }, []);
  let index = cardarr.indexOf("alp");
  return (
    <div className="bg-[#61876E] ">
      
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ids}
        onChange={(e, index) => {
          // setnewid(index.id)
          // setind(index)
          console.log(index.ind);
          setind(index.ind);
          // nav("/profile")
        }}
        sx={{ width: 300,marginTop:5 ,marginLeft:70,backgroundColor:"white"}}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />

      <div className="md:grid md:grid-cols-2 p-12  w-full justify-center">
        {cardarr[ind]?.map((item, index) => {
          return (
            <Post
              id={item.id}
              caption={item.array.caption}
              imageurl={item.array.url}
              name={item.array.name}
              createdby={item.array.createdby}
              likes={item.array.likes}
              newid={newid}
              setnewid={setnewid}
            />
          );
        }, [])}
      </div>
    </div>
  );
};
