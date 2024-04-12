/* eslint-disable @next/next/no-img-element */
"use client";
import { useUserAuth } from "./User/_utils/auth-context";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useState,useEffect } from "react";
export default function Song({ onSongClick ,playing,data,song_playing_data,savedSongs,handleAddItem}) {
  const { user} = useUserAuth();
    return (
        <div className={`backdrop-blur-md backdrop-brightness-150 group  text-white rounded-2xl w-fit flex flex-col gap-2 p-3 max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
            <div className=' flex flex-col h-fit'>

                {playing && song_playing_data.id == data.id ? <svg onClick={()=>{onSongClick(data)}} className='p-1  aspect-square object-cover cursor-pointer max-[700px]:top-3 max-[700px]:right-3 rounded-2xl border-solid border-gray-300 border-2 absolute right-5 top-5 backdrop-blur-sm backdrop-brightness-50 h-fit w-1/5 max-[500px]:w-2/6 max-[500px]:rounded-lg scale-0 ease-out duration-300 group-hover:scale-100' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#FFFFFF"/>
<path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#FFFFFF"/>
</svg>:                    <svg onClick={()=>{onSongClick(data)}} className='p-1 aspect-square object-cover cursor-pointer max-[700px]:top-3 max-[700px]:right-3 rounded-2xl border-solid border-gray-300 border-2 absolute right-5 top-5 backdrop-blur-md backdrop-brightness-50 h-fit w-1/5 max-[500px]:w-2/6 max-[500px]:rounded-lg  scale-0 ease-out duration-300 group-hover:scale-100' fill="#FFFFFF" width="800px" height="800px" version="1.1" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"/>
                    </svg>}
                <FaRegBookmark onClick={()=>{handleAddItem(data)}} className={`absolute left-6 text-white ${savedSongs.some(song => song.data.id !== data.id) && user ?" opacity-100 z-10":" opacity-0 -z-10"} rounded-2xl border-solid border-gray-300 border-2 h-9 w-9 p-1 overflow-visible backdrop-blur-sm backdrop-brightness-50 top-5 scale-0 ease-out duration-300 group-hover:scale-100 cursor-pointer`}/>
                <FaBookmark onClick={()=>{handleAddItem(data)}} className={`absolute left-6 text-white h-9 w-5 ${savedSongs.some(song => song.data.id === data.id) && user ?" opacity-100 z-10":" opacity-0 -z-10"} rounded-2xl border-solid border-gray-300 border-2 h-9 w-9 p-1 overflow-visible backdrop-blur-sm backdrop-brightness-50 top-5 scale-0 ease-out duration-300 group-hover:scale-100 cursor-pointer`}/>
                <img src={`${data.album.cover_xl}`} alt="album1" width={200} height={200} className=' rounded-xl aspect-square object-cover' />
            </div>
            <div className=' flex flex-col h-full w-[170px] max-[700px]:w-[100px] max-[400px]:w-[80px]'>
                <h2 className=' text-xl font-semibold max-[700px]:text-base max-[400px]:text-sm  max-[350px]:text-xs'>{data.title_short}</h2>
                <h3 className=' text-sm font-medium max-[700px]:text-xs ease-out duration-300 max-[360px]:hidden'>By {data.artist.name}</h3>
            </div>
        </div>
    );
}
