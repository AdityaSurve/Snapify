import React, { useState, useEffect } from "react";
import ProfilePic from "../assets/profile.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ProfileBG } from "../assets/profileBg.jpeg";
import { Post } from "../components/cards/Post";
import { app, database, storage } from "../components/firebaseConfig";
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
  arrayUnion,
  serverTimestamp
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Profile = ({ newid, setnewid }) => {
  let navigate = useNavigate();
  const [profiledata,setprofiledata]=useState({});
  const [data, setdata] = useState({});
  const [data1, setdata1] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;
  const [del,setdel]=useState(0);
  // if(newid===''){
  //     console.log(newid);
  //     setnewid(newid);
  // }
  const [fireuser, setfireuser] = useState({})
  const [cardarr, setcardarr] = useState([]);
//   useEffect(() => {
//       getfireuser();
//       getImages();
//   }, [newid])
  useEffect(() => {
    getfireuser();
    getImages()
  }, [])

  useEffect(() => {
    getfireuser();
    getImages()
  }, [newid])

  

  const getImages = async () => {
    
    const q = query(collection(database, "images"), where("createdby", "==", newid));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  var arr = [];
  querySnapshot.forEach((item) => {
    arr.push({ array: item.data(), id: item.id });
  });
  console.log(arr,'jvmjcmchcmhcmv,jv');
  setcardarr([...arr]);
//   console.log("Current cities in CA: ", cities.join(", "));
});

// console.log(cardarr);

    // const collectionRef = collection(database, 'images');
    // const nameQuery = query(collectionRef, where("createdby", "==", newid))
    // var arr = [];
    // await getDocs(nameQuery)
    //   .then((res) => {
    //     console.log(res);
    //     res.docs.map((item) => {
    //       arr.push({ array: item.data(), id: item.id });
    //       console.log(item.id)
    //     })
    //   })
    // setcardarr([...arr]);
  }
//   console.log(cardarr,'hello')

  const onChangefile = (e) => {
    let newInput = { [e.target.name]: e.target.files[0] };
    setdata({ ...data, ...newInput });
  };

  const onChangefile1 = (e) => {
    let newInput = { [e.target.name]: e.target.files[0] };
    setdata1({ ...data1, ...newInput })
  }

  const getfireuser = async () => {
    const docRef = doc(database, "users", newid);
    const docSnap = await getDoc(docRef);
    setfireuser(docSnap.data())
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  };
  async function getdoc(){

    const res = await getDoc(doc(database, "users", newid));
    // console.log(s);
    console.log(res.data());;
    
    setprofiledata(res.data());


  }
  useEffect(()=>{
    getdoc();
    

  },[])
  useEffect(()=>{
    getdoc();
    

  },[newid])

  const handleInput1 = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata1({ ...data1, ...newInput });
  }

  const handleUpdate = () => {
    const doctoupdate = doc(database, 'users', newid)
    updateDoc(doctoupdate, {
      bio: data.bio,
      type: data.type
    })
  }

  const handleUpdate1 = (e) => {
    e.preventDefault()
    // const doctoupdate = doc(database, 'images', newid)
    // updateDoc(doctoupdate, {
    //     bio: data.bio,
    //     type: data.type
    // })
    const storageRef = ref(storage, newid);

    const uploadTask = uploadBytesResumable(storageRef, data1.image1)
    uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
      },
      () => {
        console.log(data1,'data1');
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);

          const docRef = await addDoc(collection(database, "images"), {
            caption: data1.caption,
            createdby: fireuser.uid,
            name: fireuser.name,
            likes: 0,
            tags: arrayUnion(...[data1.tag1, data1.tag2]),
            url: downloadURL
          }).then((dc) => {
            console.log("uploaded");
            console.log(dc.id);
            const doctoupdate = doc(database, 'users', newid)
          updateDoc(doctoupdate, {
            posts:arrayUnion(dc.id)
          })
          })

          

        });
      });

  }

  const handleUpdateImage = () => {
    const storageRef = ref(storage, newid);

    const uploadTask = uploadBytesResumable(storageRef, data.image)
    uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await updateDoc(doc(database, "users", newid), {
            imageURL: downloadURL
          })
        });
      });
  }

  const handlegotoChat = async () => {
    const combid =
      newid > user.uid ?
        newid + user.uid
        : user.uid + newid
    try {
      const res = await getDoc(doc(database, "chats", combid))
      console.log(res.exists());
      if (!res.exists()) {
        //create chats
        await setDoc(doc(database, "chats", combid), {
          message: []
        })
        console.log(user);
        //create userchats
        updateDoc(doc(database, "userchats", newid), {
          [combid + ".userinfo"]: {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            // imageURL:user.imageURL
          },
          [combid + ".date"]: serverTimestamp()
        })
        updateDoc(doc(database, "userchats", user.uid), {
          [combid + ".userinfo"]: {
            uid: newid,
            email: fireuser.email,
            name: fireuser.name
          },
          [combid + ".date"]: serverTimestamp()
        })
        navigate("/chats")
      }
      else {
        navigate("/chats")
      }
    }
    catch (err) {
    }
  }

  const handleaddEvent = (e) => {
    e.preventDefault()
    const docRef = addDoc(collection(database, "events"), {
      desc: data1.desc,
      from: user.uid,
      fromname: user.displayName,
      to: newid,
      accepted: false,
      Location: data1.loc,
      Title: data1.title
    });
  }

  return (
    <div>
            <Navbar newid={newid} setnewid={setnewid} />
            <div className="flex flex-row bg-profilebg p-48 h-screen bg-cover">
                <div className="flex flex-col h-[100%] w-[60%] p-6 justify-center">
                    <div className='flex flex-col gap-4 items-center'>
                        {fireuser?.imageURL?<div className=''><img src={fireuser?.imageURL} className="h-[200px] w-[200px] rounded-full shadow-lg shadow-black" /></div>:<label htmlFor="image">
                        <img src={ProfilePic} className="h-[200px] w-[200px] mb-10" />
                        </label>}
                        <input
                        className='hidden'
                            id='image'
                            type="file"
                            placeholder="Upload Photo"
                            onChange={(event) => onChangefile(event)}
                            name="image"
                           
                        />
                         {user.uid===newid && !fireuser.imageURL && <button className="bg-[#61876E] hover:bg-[#AA5656] border-2  rounded-2xl text-white w-[250px] font-jost py-2 px-4 mt-12 shadow-black shadow-lg hover:scale-110 transition duration-300 ease-in-out"  onClick={handleUpdateImage}>Update Profile Picture</button>}
                        <a href="#gallery">
                        <button className="bg-[#61876E] hover:bg-[#AA5656] border-2  rounded-2xl text-white w-[250px] font-jost py-2 px-4  shadow-black shadow-lg hover:scale-110 transition duration-300 ease-in-out" ><Link to="#gallery">View Gallery</Link></button></a>
                    </div>
                </div>
                <div className="flex flex-col h-[100%] bg-[#deebe1] shadow-md shadow-black rounded-xl w-[50%] p-8 gap-4">
                    <div className='flex flex-row  justify-start font-ibm text-black text-2xl'>
                        <div className=''>Name:</div>
                        <div className='  '>{profiledata?.name}</div>
                    </div>
                    <div className='flex flex-row justify-start font-ibm text-black text-2xl'>
                        <div className=''>Email:</div>
                        <div className='  '>{profiledata?.email}</div>
                    </div>
                    
                    <div className='flex flex-row  justify-start font-ibm text-black text-2xl'>
                        <div className=''>Bio:</div>
                        {fireuser?.bio ? <div className=''>{fireuser.bio}</div> : <input type='text' className='h-8' onChange={(event) => handleInput(event)} name="bio"></input>}
                    </div>
                    <div className='flex flex-row justify-start font-ibm text-black text-2xl'>
                        <div className=''>Type:</div>
                        {fireuser?.type ? <div className=''>{fireuser.type}</div> : <input type='text' className='h-8' onChange={(event) => handleInput(event)} name="type"></input>}
                       
                    </div>
                    <div className='mt-6'>
                    {user.uid===newid?<button className="bg-[#61876E] hover:bg-[#AA5656] border-2  rounded-2xl text-white w-[250px] font-jost py-2 px-4 mt-12 shadow-black shadow-lg hover:scale-110 transition duration-300 ease-in-out"  onClick={handleUpdate}>Update Profile</button>:
                    <button className="bg-[#61876E] hover:bg-[#AA5656] border-2  rounded-2xl text-white w-[250px] font-jost py-2 px-4 mt-12 shadow-black shadow-lg hover:scale-110 transition duration-300 ease-in-out"  onClick={handlegotoChat}>Go to Chat</button>}
                    </div>
                </div>
            </div>
            {/* <div class=""> */}
  {user.uid===newid?<form class="bg-[#61876E] p-6 shadow-md ">
    <div class="mb-4">
      <label class="block text-black font-bold mb-2" for="caption">
        Description
      </label>
      <textarea class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="caption" name="caption" onChange={(event) => handleInput1(event)}></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-black font-bold mb-2" for="image">
        Image
      </label>
      <input class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="file" name="image1" id="image1"  onChange={(e)=>{onChangefile1(e)}} ></input>
      </div>
    <div class="mb-4">
     
    
      <div class="flex flex-wrap">
  <label for="tags" class="block text-black  font-bold mb-2 mr-2">
    Tags:
  </label>
  <input type="text" name="tag1" id="tag1" class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline" placeholder="Add tag 1" onChange={(event) => handleInput1(event)}></input>
  <input type="text" name="tag2" id="tag2" class="w-full px-3 py-2 text-gray-700 mt-2 border rounded-lg focus:outline-none focus:shadow-outline" placeholder="Add tag 2"  onChange={(event) => handleInput1(event)}></input>
</div>

    </div>
    <div class="flex justify-end">
      <button onClick={handleUpdate1} class="bg-[#AA5656]  text-white font-bold py-2 px-4 rounded">
        Add Post
      </button>
    </div>
  </form>:
  <form class="bg-[#61876E] p-6 shadow-md ">
    <div class="mb-4">
      <label class="block text-black font-bold mb-2" for="desc">
        Description
      </label>
      <textarea class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="desc" name="desc" onChange={(event) => handleInput1(event)}></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-black font-bold mb-2" for="title">
        Title
      </label>
      <textarea class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="title" name="title" onChange={(event) => handleInput1(event)}></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-black font-bold mb-2" for="loc">
        Location
      </label>
      <textarea class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="loc" name="loc" onChange={(event) => handleInput1(event)}></textarea>
    </div>
    
    <div class="flex justify-end">
      <button onClick={handleaddEvent} class="bg-[#AA5656]  text-white font-bold py-2 px-4 rounded">
        Request Event
      </button>
    </div>
  </form>}
{/* </div> */}

            <div className="  bg-[#61876E]  p-4" id="gallery">
                <p className="font-jost text-black font-bold text-[100px]">My Gallery</p>
                <div className="md:grid md:grid-cols-2 items-center gap-16 w-full justify-center">
           {
            cardarr?.map((item,index)=>{
                // console.log(item.array);
                return (

                    <Post id={item.id} caption={item.array.caption} imageurl={item.array.url} name={item.array.name} likes={item.array.likes} createdby={item.array.createdby}/>


                 )
            },[])
           } 
        </div>
            </div>
         
        </div>
  );
};