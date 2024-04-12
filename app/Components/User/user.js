/* eslint-disable @next/next/no-img-element */
import Song from "../song";
import { useUserAuth } from "./_utils/auth-context";
export default function User({onSongClick,playing,song_playing_data,tracks,isFetching,savedSongs,handleAddItem}) {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const handleGitHubSignIn = async () => {
        await gitHubSignIn();
      };
    
      const handleSignOut = async () => {
        await firebaseSignOut();
      };

    return (
        <div className="flex flex-col gap-0 h-full rounded-lg text-white">
            {user ? 
            <div className="bg-slate-900 w-full h-3/5 flex items-center p-3">
                <img src={user.photoURL} alt="user" width={200} height={200} className="float-left rounded-full aspect-square object-cover align-middle drop-shadow-lg"/>
                <div className="p-3 flex flex-col gap-1">
                <span className=" text-sm font-light">Profile</span>
                <h1 className="text-7xl font-bold items-center max-[700px]:text-4xl max-[400px]:text-lg max-[700px]:m-3 max-[400px]:m-2">{user.displayName}</h1>
                <h2 className=" text-sm font-light">{user.email}</h2>
                </div>
            </div>
            :

        <div className="bg-slate-900 w-full h-2/5 flex justify-center items-center p-3">
            <span className=" text-3xl text-center">You need to Login to view your information</span>
            
        </div>
}
        <div className="bg-slate-800 w-full h-1/5 flex flex-row items-center p-3 justify-evenly">
            {user ?        <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Logout</button> :        <button onClick={handleGitHubSignIn} className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-4 rounded m-4 h-20 w-fit">Login with GitHub</button> }


        </div>
        <div className="bg-slate-700 w-full h-full flex flex-col">
        <h1 className="m-3 font-bold text-xl">My Songs:</h1>
        <p className="m-3 text-sm">These are all the Songs that you have saved:</p>
        {!user ? <p className="m-3 text-sm">You need to login to view your Saved Songs:</p> :
        <>
        <div className='flex flex-row gap-5 p-2 overflow-scroll max-[700px]:gap-3 max-[400px]:gap-2'>
        {isFetching ? (
                            <div className={`backdrop-blur-md backdrop-brightness-150 w-[180px] h-[200px]  text-white rounded-2xl animate-pulse flex flex-col align-middle text-center object-center p-3 pt-[80px] text-xl content-center max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <>
                            {tracks.length == 0 ? <span className=" p-3 font-semibold">There are no Saved Songs</span>:tracks.map((song, index) => (
                                <Song key={index} data={song.data} savedSongs={savedSongs} handleAddItem={handleAddItem} onSongClick={onSongClick} playing={playing} song_playing_data={song_playing_data}/>
                            ))}
                            
                            </>

                        )}
                    </div>
        </>
}       
        </div>
        </div>
    );
  }
  