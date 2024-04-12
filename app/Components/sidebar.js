/* eslint-disable @next/next/no-img-element */
"use client";
import { data } from "autoprefixer";
import { useUserAuth } from "./User/_utils/auth-context";
import React, { useState } from "react";
export default function Sidebar({onViewSelect,tracks,isFetching,onSongClick}) {
    const { user} = useUserAuth();
    const[view, setView] = useState("home");
    const handleViewSelect = (view) => {
        setView(view);
        onViewSelect(view);
    }
    return (
      <div className="flex h-full  max-[1000px]:h-fit w-full flex-col gap-3 text-black max-[400px]:gap-0">
        <div className="bg-white w-full flex flex-row min-[1001px]:flex-col p-5 max-[1000px]:p-3 max-[700px]:p-2 rounded-2xl h-fit gap-2">
            <h2 className={`p-3 duration-300 object-center ease-out rounded-lg max-[400px]:text-xs max-[700px]:text-sm max-[700px]:p-1 max-[1000px]:text-base max-[1000px]:p-2 max-[400px]:p-1 font-bold cursor-pointer ${view=="home" ? " bg-black text-white":"hover:bg-gray-200"}`} onClick={()=>{handleViewSelect("home")}}>
                Home
            </h2>
            <h2 className={`p-3 duration-300 ease-out rounded-lg max-[400px]:text-xs max-[700px]:text-sm max-[700px]:p-1 max-[1000px]:text-base max-[1000px]:p-2 max-[400px]:p-1 font-bold cursor-pointer ${view=="user" ? " bg-black text-white":"hover:bg-gray-200"}`} onClick={()=>{handleViewSelect("user")}}>
                User Profile
            </h2>
            <h2 className={`p-3 duration-300 ease-out rounded-lg max-[400px]:text-xs max-[700px]:text-sm max-[700px]:p-1 max-[1000px]:text-base max-[1000px]:p-2 max-[400px]:p-1 font-bold cursor-pointer ${view=="search" ? " bg-black text-white":"hover:bg-gray-200"}`} onClick={()=>{handleViewSelect("search")}}>
                Search
            </h2>
        </div>
        <div className="bg-white w-full flex flex-col p-5 rounded-2xl h-full max-[1000px]:h-0 max-[1000px]:hidden">
            <h1 className="m-3 font-bold">My Saved Songs</h1>
            <div className=" flex flex-col gap-1 duration-300 ease-in-out">
                {!user ? <p className="text-sm text-center">You need to login to view your saved songs</p> : 
                <>
                {isFetching ? <p>Loading...</p> : tracks.map((track,index) => (
                    <div key={index} className="flex flex-row gap-3 p-2 backdrop-blur-sm backdrop-brightness-50 active:scale-90 cursor-pointer hover:backdrop-brightness-0 ease-in-out duration-200 rounded-2xl overflow-hidden text-white" onClick={()=>{onSongClick(track.data)}}>
                        <img src={`${track.data.album.cover_xl}`} alt="album1" width={50} height={50} className="rounded-xl aspect-square object-cover"/>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">{track.data.title_short}</h2>
                            <h3 className="text-xs font-medium">By {track.data.artist.name}</h3>
                        </div>
                    </div>
                ))}
                </>
}
            </div>
        </div>
      </div>
    );
  }
  