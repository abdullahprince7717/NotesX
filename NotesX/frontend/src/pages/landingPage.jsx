import { useState } from 'react'
import hero from '../assets/hero-bg-2x.jpg'
import img1 from '../assets/note-item-bg.jpg'
import img2 from '../assets/list-item-bg.jpg'
import img4 from '../assets/pressed-for-time-nexus5.jpg'
import img5 from '../assets/market-bg.jpg'
import img6 from '../assets/hand-flat-2x.png'

function LandingPage() {
    return (
        <div className='h-screen w-screen bg-fixed bg-center' style={{ backgroundImage: `url(${hero})` }} >
            <div className='relative flex flex-col justify-end items-center min-h-[34rem] text-white  p-10 text-center'>
                <h1 className='absolute top-2 left-4 text-5xl '>Notes<b>X</b></h1>
                <p className='font-thin text-5xl'>Save your notes, your way</p>
                <button className='bg-[#306BE9]  text-white text-xl px-6 py-3 rounded-md mt-4'>Try NotesX</button>
            </div>
            <div className='bg-white flex flex-col items-center justify-evenly py-10 px-4 text-center text-gray-400' >
                <p className='text-3xl font-thin '>Capture whats on your mind</p>
                <p className='my-4'>Add notes, lists, photos and much more to Keep</p>

                <div className='flex flex-col justify-evenly min-h-[70rem]'>
                    <img src={img1} width={210} />
                    <img src={img2} width={210} />
                    <img src={img2} width={210} />
                    <img src={img1} width={210} />
                </div>

                <div className='h-[2px] w-full bg-gray-200 my-20' />

                <p className='text-3xl font-thin '>When and where you need it</p>
                <p className='text-start my-4 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti obcaecati dolorem aperiam? Aliquam, veniam nesciunt, soluta maxime, laudantium sunt vero id fuga quae maiores in adipisci eos illum labore.</p>
                <img src={img4} />
            </div>

            <div>
                <div className='bg-[#306BE9] text-white flex flex-col items-center  py-10 px-4 text-center bg-cover max-h-[37rem]' style={{ backgroundImage: `url(${img5})` }} >
                    <p className='text-3xl font-thin '>Keep makes it easy to organize your notes and find what you're looking for</p>
                    <p className='my-4'>Add notes, lists, photos and much more to Keep</p>
                    <img src={img6} width={400} />
                </div>
            </div>
        </div>
    )
}

export default LandingPage