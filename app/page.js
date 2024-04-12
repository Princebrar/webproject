/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { saveSong,getSavedSongs,deleteSong } from "./Components/User/_services/music-web-service";
import { useUserAuth } from "./Components/User/_utils/auth-context";
import Home from "./Components/home";
import Search from "./Components/search";
import User from "./Components/User/user";
import Sidebar from "./Components/sidebar";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
export default function Page() {
    const [song_playing_data, setSongPlayingData] = useState([{}]);
    const [audio_src, setAudioSrc] = useState("");
    const [playervisible, setPlayer] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [view1, setView] = useState("home");
    const audioRef = useRef(null);
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [savedSongs, setSavedSongs] = useState([]);
    const [isFetching1, setIsFetching1] = useState(true);
    const [isFetching2, setIsFetching2] = useState(true);
    const { user} = useUserAuth();
      useEffect(() => {
          const loadItems = async () => {
            if (user){
              setIsFetching1(true);
              const result = await getSavedSongs(user.uid);
              setSavedSongs(result);
              setIsFetching1(false);
            };
          };
      
          loadItems();
        }, [user]);
      const handleAddItem = async (data) => {
      if (user && !savedSongs.some(song => song.data.id === data.id)){
        const newItem = data;
        const addedItem = await saveSong(user.uid, newItem);
        setSavedSongs([...savedSongs, {data: newItem, segmentNumber: addedItem}]);
      }
  
      else if (user && savedSongs.some(song => song.data.id === data.id)){
          const newItem = data;
          const newItems = savedSongs.filter(song => song.data.id !== data.id);
          setSavedSongs(newItems);
          const deletedItem = await deleteSong(user.uid, savedSongs.find(song => song.data.id === data.id));
          };
      setIsFetching2(!isFetching2);
    }; 
  useEffect(() => {
    async function fetchDeezerChart() {
        setIsFetching(true);
        const url1 = 'https://corsproxy.io/?https://api.deezer.com/chart';
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
          setTracks(result.tracks.data);
            setArtists(result.artists.data);
            setAlbums(result.albums.data);
          setIsFetching(false);
        } catch (error) {
          setIsFetching(false);
          console.error(error);
        }

    }

    fetchDeezerChart();
  }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [playing,audio_src]);

    const onViewSelect = (view) => {
        setView(view);
    };

    const onSongClick = (data) => {
        setPlayer(true);
        if (song_playing_data.id == data.id && playing) {
            setPlaying(false);
        }
        else{
            clearTimeout();
            setAudioSrc(data.preview);
            setPlaying(true);
            setTimeout(() => {
                setPlaying(false);
              }, 30000);
        }
        setSongPlayingData(data);
    };

    const onPlayerClose = () => {
        console.log("Player Closed");
        setPlayer(false);
        setPlaying(false);
        audioRef.current.currentTime = 0;
    };
    const nextSong = () => {
        audioRef.current.currentTime = 0;
        onSongClick(tracks[song_playing_data.position])
        console.log("Next Song");
        audioRef.current.currentTime = 0;
    };
    const prevSong = () => {
        if (song_playing_data.position == 1)
        {
            audioRef.current.currentTime = 0;
            onSongClick(tracks[0])
            console.log("Previous Song");
            audioRef.current.currentTime = 0;
            return;
        }
        onSongClick(tracks[song_playing_data.position-2])
        console.log("Previous Song");
        audioRef.current.currentTime = 0;
    };

    return (
        <main className="bg-gray-300 flex flex-col h-screen w-screen">
            <div className="flex flex-col h-screen">
                <div className={`flex flex-row h-[100px] w-screen max-[700px]:h-[70px] rounded-b-3xl overflow-hidden fixed ease-out duration-100 ${playervisible ? " translate-y-0" : "-translate-y-full"}`}>
                    <audio ref={audioRef} src={`${audio_src}`} />
                    <div className=" overflow-hidden">
                      {playervisible && <img src={`${song_playing_data.album.cover_xl}`} className=" absolute h-full w-full -z-10 blur-lg brightness-50 object-cover"/>}
                    </div>
                    <div className=" flex flex-row h-fit w-1/3 m-2 gap-3 p-1">
                    {playervisible &&<> <img src={`${song_playing_data.album.cover_xl}`} className={` h-20 w-20 max-[700px]:h-10 max-[700px]:w-10 object-cover z-20 ease-in-out duration-300 rounded-full border-[1px] border-solid border-white ${playing ?"animate-spin":" animate-none"}`}/>
                      <div className="flex flex-col w-fit items-center justify-center">
                        <h2 className="text-white text-2xl font-semibold max-[700px]:text-lg max-[500px]:text-sm text-center">{song_playing_data.title_short}</h2>
                        <h3 className="text-white text-lg font-light max-[700px]:text-sm max-[500px]:text-xs">By {song_playing_data.artist.name}</h3>
                      </div></>}
                    </div>
                    <div className="flex flex-row h-full w-1/3 gap-0 justify-center items-center">
                    <MdSkipPrevious className=" h-1/2 w-fit brightness-75 ease-in-out duration-100 cursor-pointer hover:brightness-100 active:scale-90" onClick={prevSong}/>
                    <FaPlay className={` h-1/2 w-fit brightness-75 ease-in-out duration-100 cursor-pointer hover:brightness-100 ${playing ?" opacity-0":" opacity-100 "} translate-x-1/2 active:scale-90`} onClick={()=>{onSongClick(song_playing_data)}}/>
                    <FaPause  className={` h-1/2 w-fit brightness-75 ease-in-out duration-100 cursor-pointer hover:brightness-100 ${!playing ?" opacity-0":" opacity-100"} -translate-x-1/2 active:scale-90`} onClick={()=>{onSongClick(song_playing_data)}}/>
                    <MdSkipNext className=" h-1/2 w-fit brightness-75 ease-in-out duration-100 cursor-pointer hover:brightness-100 active:scale-90" onClick={nextSong}/>
                    </div>
                    <div className=" h-full w-1/3 flex flex-col justify-center items-end px-5">
                    <FaSquareXmark className="h-1/3 w-fit ease-in-out duration-200 text-red-600 cursor-pointer hover:text-red-700" onClick={onPlayerClose}/>
                    </div>
                 </div>
          <div className={`flex flex-row max-[1000px]:flex-col h-full gap-4 p-3 ease-out duration-300 ${playervisible && "pt-[110px] max-[700px]:pt-[80px]"}`}>
          <div className="flex w-1/5 max-[1000px]:w-full h-full max-[1000px]:h-fit">
              <Sidebar onViewSelect={onViewSelect} tracks={savedSongs} isFetching={isFetching1} onSongClick={onSongClick}/>
          </div>
          <div className="bg-white w-full flex flex-col rounded-2xl h-full overflow-scroll">
              {view1=="home" && <Home onSongClick={onSongClick} playing={playing} tracks={tracks} artists={artists} albums={albums} song_playing_data={song_playing_data} isFetching={isFetching} savedSongs={savedSongs} handleAddItem={handleAddItem}/>}
              {view1=="user" && <User onSongClick={onSongClick} playing={playing} tracks={savedSongs} artists={artists} albums={albums} song_playing_data={song_playing_data} isFetching={isFetching1} savedSongs={savedSongs} handleAddItem={handleAddItem}/>}
              {view1=="search" && <Search onSongClick={onSongClick} playing={playing} tracks={tracks} artists={artists} albums={albums} song_playing_data={song_playing_data} isFetching={isFetching} savedSongs={savedSongs} handleAddItem={handleAddItem}/>}
          </div>
          </div>
          </div>   
      </main>
    );
  }
  