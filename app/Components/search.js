"use client";
import React from "react";
import Song from "./song";
import { useState,useEffect } from "react";
export default function Search({onSongClick,playing,song_playing_data,savedSongs,handleAddItem}) {
    const [search, setSearch] = useState("");
    const [fetching, setFetching] = useState(false);
    const onButtonClick = () => {
        async function fetchDeezerChart() {
            setFetching(true);
            const url1 = `https://corsproxy.io/?https://api.deezer.com/search?q=track:"${search}"`;
            const options1 = {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': 'd88938f18fmsh177b7838d002649p15e49ajsn552e240efc5d',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
              }
            };
            
            try {
              const response = await fetch(url1, options1);
              const result = await response.json();
              setNewSongs(result.data);
              setFetching(false);
            } catch (error) {
              console.error(error);
            }
    
        }
    
        fetchDeezerChart();
      }
    const [newSongs, setNewSongs] = useState([]);
    return (
        <div className="flex flex-col gap-0 h-full rounded-lg text-white">
        <form         onSubmit={e => { e.preventDefault();   onButtonClick();      }}       >
            <input type="text" className="p-3 w-full bg-slate-800" placeholder="Search for Songs, Albums, Artists, etc." onChange={(val)=>{setSearch(val.target.value)}}/>
            <button type="button" className="bg-slate-800 p-3 w-full" onClick={onButtonClick}>Search</button>
        </form>
        <div className="bg-slate-700 w-full h-full flex flex-col">
        <h1 className="m-3 font-bold text-xl">Your Result</h1>
        <p className="m-3 text-sm">These are all the songs whose name is:</p>
        <div className='flex flex-row gap-5 p-2 overflow-scroll max-[700px]:gap-3 max-[400px]:gap-2'>
        {fetching ? (
                            <div className={`backdrop-blur-md backdrop-brightness-150 w-[180px] h-[200px]  text-white rounded-2xl animate-pulse flex flex-col align-middle text-center object-center p-3 pt-[80px] text-xl content-center max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
                                <p>Loading...</p>
                            </div>
                        ) :
        <>
        {newSongs.length==0 ? <p className="m-2 text-sm">No Results Found</p> :         newSongs.map((song, index) => (
            <Song key={index} data={song} name={song.title_short} savedSongs={savedSongs} handleAddItem={handleAddItem} singer={song.artist.name} onSongClick={onSongClick} playing={playing} picture={song.album.cover_xl} song_playing_data={song_playing_data}/>                                ))}
        </>}
                    </div>
                    
        </div>
        </div>
    );
  }
  