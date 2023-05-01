import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export const Banner=()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    return(
        <div className="flex flex-col items-center justify-center bg-bannerBg h-screen bg-cover bg-no-repeat w-screen ">
         
            <div className=" h-2/3 w-1/3 bg-white flex justify-center items-center flex-col">
                <p className="p-5 text-black text-ibm font-bold text-[100px] text-center ">PHOTO<br/>GRA<br/>PHY.</p>
                <ArrowDownwardIcon  style={{ width: "30px", height: "30px" }}/>

            </div>
        </div>
    )
}