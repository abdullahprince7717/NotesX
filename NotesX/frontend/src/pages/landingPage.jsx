import hero from '../assets/hero-bg-2x.jpg'
import img1 from '../assets/note-item-bg.jpg'
import img2 from '../assets/list-item-bg.jpg'
import img4 from '../assets/pressed-for-time-nexus5.jpg'
import img5 from '../assets/market-bg.jpg'
import img6 from '../assets/hand-flat-2x.png'
import img7 from '../assets/ss.png'
import img8 from '../assets/always-chromebook.jpg'
import img9 from '../assets/n7.jpg'
import img10 from '../assets/n5.jpg'
import img11 from '../assets/footer-bg.jpg'

function LandingPage() {
    return (
        <div className='h-screen w-screen bg-fixed bg-center ' style={{ backgroundImage: `url(${hero})` }} >
            <div className='relative flex flex-col justify-end items-center sm:justify-center sm:items-start sm:w-[30rem] min-h-[34rem] text-white  p-10 text-center sm:text-start'>
                <h1 className='absolute top-2 left-4 text-5xl lg:text-6xl'>Notes<b>X</b></h1>
                <p className='font-thin text-5xl md:text-6xl'>Save your notes, your way</p>
                <button className='bg-[#306BE9]  text-white text-xl px-6 py-3 rounded-md mt-4'>Try NotesX</button>
            </div>
            <div className='bg-white flex flex-col items-center justify-evenly py-10 px-4 pb-0 text-center text-gray-400' >
                <p className='text-3xl font-thin '>Capture whats on your mind</p>
                <p className='my-4 mb-8'>Add notes, lists, photos and much more to NotesX</p>

                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-24 '>
                    <img src={img1} width={210} />
                    <img src={img2} width={210} />
                    <img src={img2} width={210} />
                    <img src={img1} width={210} />
                </div>

                <div className='h-[2px] w-full bg-gray-200 my-20  ' />

                <div className='sm:flex sm:items-center'>
                    <div className='sm:px-10 xl:px-60 text-left'>
                        <p className='text-3xl font-thin '>When and where you need it</p>
                        <p className='text-start my-4 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti obcaecati dolorem aperiam? Aliquam, veniam nesciunt, soluta maxime, laudantium sunt vero id fuga quae maiores in adipisci eos illum labore.</p>
                    </div>
                    <img src={img4} className='sm:w-80' />
                </div>
            </div>


            <div className='bg-[#306BE9] relative text-white flex flex-col items-center py-10 px-4 text-center bg-cover min-h-[33rem] md:min-h-[40rem]' style={{ backgroundImage: `url(${img5})` }} >
                <p className='text-3xl font-thin sm:px-10 lg:px-40'>NotesX makes it easy to organize your notes and find what youre looking for</p>
                <p className='my-4'>Add notes, lists, photos and much more to NotesX</p>
                <img src={img6} className='absolute bottom-0 w-60 md:w-80 lg:96 ' />
            </div>

            <div className='sm:flex sm:items-center sm:justify-between py-10 pb-20 px-4'>
                <div className='px-10 xl:px-60'>
                    <p className='text-3xl font-thin '>Find what you need, fast</p>
                    <p className='text-start my-4 text-gray-600'>Quickly filter and search for notes by color and other attributes like lists with images, audio notes with reminders or just see shared notes. Find what youre looking for even faster, and let NotesX do the remembering for you.</p>
                </div>
                <img src={img7} className='w-full sm:w-1/2' />
            </div>

            <div className='px-4'>
                <div className='h-[2px] w-full bg-gray-200 ' />
                <div className=' w-full flex flex-col md:flex-row items-center justify-evenly bg-[#FBFBFB] px-10 py-4'>
                    <img src={img9} className='md:basis-1/3 hidden md:inline md:w-40' />
                    <img src={img8} className='w-2/3' />
                    <img src={img10} className='hidden md:inline md:h-40 lg:h-72 xl:h-96' />
                    <div className='flex justify-between py-5 px-5 md:hidden'>
                        <img src={img9} className='-rotate-6 w-1/2' />
                        <img src={img10} className='rotate-6 h-1/3' />
                    </div>
                </div>
                <div className='md:px-32 text-start md:text-center xl:px-60 '>
                    <p className='text-3xl font-thin'>Always within reach</p>
                    <p className='my-4 text-gray-600'>NotesX works on your phone, tablet and computer. Everything you add to NotesX syncs across your devices so your important stuff is always with you.</p>
                </div>
            </div>

            <div className='bg-[#306BE9] text-white flex flex-col items-center  py-10 px-4 text-center bg-cover max-h-[37rem]' style={{ backgroundImage: `url(${img11})` }} >
                <p className='text-3xl font-thin '>Keep Every Thought with NotesX</p>
                <button className='bg-[#306BE9]  text-white text-xl px-6 py-3 rounded-md mt-4'>Try NotesX</button>
            </div>
        </div>
    )
}

export default LandingPage