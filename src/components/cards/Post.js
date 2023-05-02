import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { app, database, storage } from "../firebaseConfig";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useRazorpay from "react-razorpay";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

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
  arrayRemove,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Navbar from "../Navbar";

export const Post = ({
  watermark,
  getImages,
  del,
  setdel,
  id,
  imageurl,
  caption,
  name,
  likes,
  newid,
  setnewid,
  createdby,
}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  let nav = useNavigate();

  const handleGotoProfile = () => {
    setnewid(createdby);
    console.log(createdby);
    nav("/profile");
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(database, "images", id),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data(), "asgdargsd");
        setdata({ ...doc.data() });
      }
    );
  }, []);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(database, "images", id),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data(), "asgdargsd");
        setdata({ ...doc.data() });
      }
    );
  }, [newid]);

  const [clicked, setclicked] = useState(0);
  const [text, setText] = useState("View More");
  const [isShown, setIsShown] = useState(false);
  const Razorpay = useRazorpay();

  const handlePayment = async (key, name) => {
    // const order = await createOrder(params); //  Create order on your backend

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: name,
      description: "Buying photo",
      image: "https://example.com/your_logo",
      // order_id: "sdgvgs", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response) {
        // alert(response.razorpay_payment_id);

        await updateDoc(doc(database, "users", user.uid), {
          purchased: arrayUnion(id),
        });

        await updateDoc(doc(database, "images", id), {
          purchasedby: user.uid,
        }).then(() => {
          alert(response.razorpay_payment_id);
        });

        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  const [data, setdata] = useState({});
  useEffect(() => {
    const unsub = onSnapshot(
      doc(database, "images", id),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data(), "asgdargsd");
        setdata({ ...doc.data() });
      }
    );
  }, [clicked]);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(database, "images", id),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data(), "asgdargsd");
        setdata({ ...doc.data() });
      }
    );
  }, []);

  const handleDelete = () => {
    const doctoupdate = doc(database, "images", id);
    deleteDoc(doctoupdate);
    const doctoupdate2 = doc(database, "users", createdby);
    updateDoc(doctoupdate2, {
      posts: arrayRemove(id),
    }).then(() => {
      // setdel(!del);
      getImages();
    });
  };

  function handleClick() {
    setIsShown((current) => !current);
    if (text === "View More") {
      setText("View Less");
    } else {
      setText("View More");
    }
  }

  function handleLike() {
    if (clicked === 0) {
      setclicked(1);
      const doctoupdate = doc(database, "images", id);
      updateDoc(doctoupdate, {
        likes: data.likes + 1,
      });
      // likes++;
    } else {
      setclicked(0);
      const doctoupdate = doc(database, "images", id);
      updateDoc(doctoupdate, {
        likes: data.likes - 1,
      });
      // likes--;
    }
  }

  return (
    <div
      style={{ position: "relative" }}
      className="mt-10 ml-10 p-3 w-[300px] md:w-[640px] "
    >
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row gap-2 text-white text-xl  font-jost "
          onClick={handleGotoProfile}
        >
          <AccountCircleIcon />
          <span>{name}</span>
        </div>
        {watermark != 0 ? (
          <ShoppingCartIcon
            onClick={() => {
              handlePayment("rzp_test_Pw7oOZCGeCRVYw", data.name);
            }}
            style={{ width: "30px", height: "30px", color: "white" }}
          />
        ) : (
          <a target="_blank" href={imageurl}>
            <DownloadIcon
              style={{ width: "40px", height: "40px" }}
              className="text-white"
            />
          </a>
        )}
      </div>
      <img
        draggable="false"
        src={imageurl}
        className="w-[400px] md:w-[652px] md:h-[360px] border-8 shadow-lg border-[#003240] mt-2 "
      ></img>
      {watermark !== 0 && (
        <p className="absolute text-xl md:text-3xl text-white font-semibold top-[160px] left-[55%] md:top-[350px] md:left-[70%] font-grotesk ">
          watermark
        </p>
      )}
      <div className="flex flex-col justify-center mt-3">
        <div className="flex flex-row justify-between">
          <div onClick={handleLike} className="text-white font-grotesk">
            <FavoriteIcon />
            <span className="ml-1">{data.likes}</span>
          </div>
          {createdby === user.uid && (
            <div onClick={handleDelete} className="text-white font-grotesk">
              <DeleteIcon />
              <span className="ml-1">Delete post</span>
            </div>
          )}
          <div
            className="text-white"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            View More
            <ArrowDropDownIcon />
          </div>
        </div>
        {isShown && (
          <div className="flex flex-col">
            <div className="text-white mt-2 text-sm md:text-xl font-grotesk ">
              {data.caption}
            </div>
            <div className="text-white mt-2 text-xl justify-between flex flex-row">
              <p className="text-md text-white font-ibm flex gap-2  ">
                {data.tags.map((item) => {
                  return (
                    <p class=" text-white font-semibold text-sm md:text-xl">
                      #{item}
                    </p>
                  );
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
