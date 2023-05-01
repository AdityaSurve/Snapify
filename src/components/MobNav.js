import React from "react";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { Link } from "react-router-dom";
const MobNav = ({showMenu,active}) =>
{
  
    return(
    
    <div className={active ? 'absolute flex flex-col items-end inset-4 gap-6 md:hidden':'hidden'}>
         <CloseTwoToneIcon  style={{ color: "#000000" }} onClick={showMenu} className='h-[100px] w-[100px] mt-4 scale-150 cursor-pointer'/>
      
         <Link to ="/explore"><div className=" hover:scale-110 transition duration-300 ease-in-out  text-[#8da193] text-xl font-medium font-jost ">EXPLORE</div></Link>
                            <Link to ="/gallery"><div className=" hover:scale-110 transition duration-300 ease-in-out  text-[#8da193] text-xl font-medium font-jost ">GALLERY</div></Link>
                            <Link to ="/events"><div className=" hover:scale-110 transition duration-300 ease-in-out  text-[#8da193] text-xl font-medium font-jost ">EVENTS</div></Link>
                            <Link to ="/chat"><div className=" hover:scale-110 transition duration-300 ease-in-out  text-[#8da193] text-xl font-medium font-jost ">CHAT</div></Link>
                            <Link to ="/aboutus"><div className=" hover:scale-110 transition duration-300 ease-in-out text-[#8da193] text-xl font-medium font-jost ">ABOUT US</div></Link>

                       
    </div>
 
    );
};
export default MobNav;


