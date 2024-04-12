/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Song from './song';
import Album from './album';
export default function Home({onSongClick,playing,tracks,artists,albums,song_playing_data,isFetching,savedSongs,handleAddItem}) {

    return (
        <div className="flex flex-col h-full w-full text-white rounded-lg">
            <div className='flex flex-col items-center bg-zinc-800'>
                <h1 className="m-5 font-bold text-3xl text-center max-[700px]:text-xl max-[400px]:text-lg max-[700px]:m-3 max-[400px]:m-2">Home</h1>
            </div>
            <div className='flex flex-col w-full p-3 bg-zinc-700 h-full overflow-scroll'>
                <div className='p-4 h-fit'>
                    <h1 className="m-2 font-bold text-xl max-[700px]:text-base max-[400px]:text-sm max-[400px]:m-1">Top Songs For you</h1>
                    <p className="p-2 text-sm font-light max-[400px]:text-xs max-[400px]:p-1">These are all the top songs for you based on your country:</p>
                    <div className='flex flex-row gap-5 p-2 overflow-scroll max-[700px]:gap-3 max-[400px]:gap-2'>
                        {isFetching ? (
                            <div className={`backdrop-blur-md backdrop-brightness-150 w-[180px] h-[200px]  text-white rounded-2xl animate-pulse flex flex-col align-middle text-center object-center p-3 pt-[80px] text-xl content-center max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
                                <p>Loading...</p>
                            </div>
                        ) : (
                            tracks.map((song, index) => (
                                <Song key={index} data={song} savedSongs={savedSongs} handleAddItem={handleAddItem} onSongClick={onSongClick}  playing={playing} song_playing_data={song_playing_data}/>
                            ))
                        )}
                    </div>
                </div>
                <div className='flex flex-col p-3 bg-zinc-700 h-fit'>
                    <h1 className="m-2 font-bold text-xl max-[700px]:text-base max-[400px]:text-sm max-[400px]:m-1">Top Artists:</h1>
                    <div className='flex flex-row gap-5 p-2 w-full overflow-scroll max-[700px]:gap-3 max-[400px]:gap-2'>
                        {isFetching ? (
                            <div className={`backdrop-blur-md backdrop-brightness-150 w-[180px] h-[200px]  text-white rounded-2xl animate-pulse flex flex-col align-middle text-center object-center p-3 pt-[80px] text-xl content-center max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
                            <p>Loading...</p>
                        </div>
                        ) : (
                            artists.map((artist, index) => (
                                <img key={index} alt={`${artist.name}'s Picture`} src={`${artist.picture_xl}`} className=" h-full w-40 mr-3 rounded-full object-cover aspect-square hover:scale-105 ease-in-out duration-300 active:scale-95 active:duration-100"/>
                            ))
                        )}
                    </div>
                </div>
                <div className='p-4 h-full'>
                    <h1 className="m-2 font-bold text-xl max-[700px]:text-base max-[400px]:text-sm max-[400px]:m-1">Top Albums For you:</h1>
                    <p className="p-2 text-sm font-light max-[400px]:text-xs max-[400px]:p-1">These are all the top Albums for you based on your country:</p>
                    <div className='flex flex-row gap-5 p-2 overflow-scroll max-[700px]:gap-3 max-[400px]:gap-2'>
                        {isFetching ? (
                            <div className={`backdrop-blur-md backdrop-brightness-150 w-[180px] h-[200px]  text-white rounded-2xl animate-pulse flex flex-col align-middle text-center object-center p-3 pt-[80px] text-xl content-center max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
                                <p>Loading...</p>
                            </div>
                        ) : (
                            albums.map((album, index) => (
                                <Album key={index} data={album}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
  }
  