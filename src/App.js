import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./Login/signup/Login";
import Signup from "./Login/signup/Signup";
import Home from "./pages/Home";
import Chats from './components/Chats';
import Events from "./pages/Events";
import {Profile} from "./pages/Profile";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import Purchased from "./pages/Purchased";

import Main from "./ImageEditor/Main";
function App() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [newid, setnewid] = useState(user?.uid)

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/explore" element={<Landing newid={newid} setnewid={setnewid}/>}></Route>
          <Route path="/chats" element={<Chats />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/profile" element={<Profile newid={newid} setnewid={setnewid}/>}></Route>
          <Route path="/purchase" element={<Purchased/>}></Route>
          <Route path="/editimage" element={<Main/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
