import { createContext, useContext, useEffect, useState,useReducer} from "react";
import { app, database, storage } from '../../components/firebaseConfig'
import { collection, addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where,setDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

// import notecontext from './notecontext'
export const Chatcontext = createContext();

export const ChatcontextProvider = ({ children }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    // const context = useContext(notecontext);
    // const { user, getUserdetails } = context;
    const INITIAL_STATE = {
        Chatid: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    // Chatid: user?.email > action.payload.email ?
                    //     user?.email?.substring(0, user?.email.length - 10) + action.payload.email?.substring(0, action.payload.email.length - 10)
                    //     : action.payload.email?.substring(0, action.payload.email.length - 10) + user?.email?.substring(0, user?.email.length - 10)
                    // Chatid:action?.payload?.email?.substring(0, action?.payload?.email.length - 10)
                    Chatid:action?.payload?.uid
                };
            default:
                return state
        }
    };

    const [state, dispatch] = useReducer(chatReducer,INITIAL_STATE)

    return (
        <Chatcontext.Provider value={{data:state,dispatch}}>
            {children}
        </Chatcontext.Provider>
    )
}

