/* eslint-disable @next/next/no-img-element */
"use client";
import Image from 'next/image';

export default function Album({data,}) {
    return (
        <div className={`backdrop-blur-md backdrop-brightness-150 group  text-white rounded-2xl w-fit flex flex-col gap-2 p-3 max-[700px]:p-2 hover:scale-105 duration-300 ease-in-out`}>
            <div className=' flex flex-col h-fit'>
                <img src={`${data.cover_xl}`} alt="album1" width={200} height={200} className=' rounded-xl aspect-square object-cover' />
            </div>
            <div className=' flex flex-col h-full w-[170px] max-[700px]:w-[100px] max-[400px]:w-[80px]'>
                <h2 className=' text-xl font-semibold max-[700px]:text-base max-[400px]:text-sm  max-[350px]:text-xs'>{data.title}</h2>
                <h3 className=' text-sm font-medium max-[700px]:text-xs ease-out duration-300 max-[360px]:hidden'>By {data.artist.name}</h3>
            </div>
        </div>
    );
}
