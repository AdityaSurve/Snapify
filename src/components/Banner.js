import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
export const Banner = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div className="flex items-center justify-center bg-bannerBg h-screen bg-cover bg-no-repeat min-w-full ">
      <div className=" h-[60%] md:h-2/3 w-[90%] md:w-1/3 bg-white flex justify-center items-center flex-col">
        <p className="p-5 text-black text-ibm font-bold text-[80px] md:text-[100px] text-center ">
          PHOTO
          <br />
          GRA
          <br />
          PHY.
        </p>
      </div>
    </div>
  );
};
