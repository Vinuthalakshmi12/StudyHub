"use client"


import {HiHome} from "react-icons/hi"
import {BsBookHalf} from "react-icons/bs"
import {SlNote} from "react-icons/sl"
import {MdHistory} from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"
import {IoExitOutline} from 'react-icons/io5'
import { useState } from "react";
import {IoMdNotificationsOutline} from "react-icons/io"
import {FaRegUser} from "react-icons/fa"
import { BiUpload } from "react-icons/bi";

interface props {
  children: React.ReactNode;
}





export default function RootLayout({ children }: props) {
 

    const [selectButton,setSelectButton]=useState<number | null>(null);

    const handleButtonClick=(buttonIndex:number )=>{
      setSelectButton(buttonIndex);
    }
  
  return (
    <div className="h-screen w-screen overflow-hidden">
      <nav
        
        className=" shadow-md  border-gray-400 h-14 flex items-center justify-between pr-[10px] text-xl font-mono font-bold"
      >
       <div className="bg-[url('/logo.jpg')] bg-contain bg-no-repeat w-full h-[65px] mb-[7px] "></div>
        <ul className="flex flex-row gap-10">
        <li><IoMdNotificationsOutline size="2rem" color="#3EB489"/></li>
          <li><FaRegUser size="1.7rem" color="#3EB489"/></li>
        </ul>
      </nav>
      <div className="w-full h-full flex">
        
          <div className="h-full w-[80px] flex flex-col items-center gap-7 mt-[20px]">
            <button onClick={()=>handleButtonClick(1)}
            className={`w-full pl-[20px]  border-r-4 ${selectButton === 1 ? 'border-green-500': 'border-white'}`}><HiHome size="2rem" color="#3EB489"></HiHome>

            </button>
            <button onClick={()=>handleButtonClick(2)}
            className={`w-full pl-[20px] border-r-4  ${selectButton === 2 ? 'border-green-500': 'border-white'}`}><div className="flex flex-row items-baseline"><BsBookHalf size="1.8rem" color="#3EB489"/><BiUpload size="1.2rem" color="#3EB489" /></div></button>

            <button onClick={()=>handleButtonClick(3)}
            className={`w-full pl-[20px] border-r-4 ${selectButton === 3 ? 'border-green-500': 'border-white'}`}><SlNote size="1.8rem" color="#3EB489"/></button>
             <button onClick={()=>handleButtonClick(4)}
            className={`w-full pl-[20px] border-r-4 ${selectButton === 4 ? 'border-green-500': 'border-white'}`}><MdHistory size="2rem" color="#3EB489"/></button>
             
             <button onClick={()=>handleButtonClick(6)}
            className={`w-full pl-[20px] border-r-4 ${selectButton === 6 ? 'border-green-500': 'border-white'}`}><IoExitOutline size="2rem" color="#3EB489"/></button>

           
           </div>

          
        
        <main className="w-full h-full bg-gray-200  overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}