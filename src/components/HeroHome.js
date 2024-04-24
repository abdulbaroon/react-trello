import { backgroundSvg } from '@/assets'
import React from 'react'

const HeroHome = () => {
    return (
        <>
            <div className='w-full min-h-[86.7vh] bg-gray-900 flex items-center justify-center'
                style={{
                    backgroundImage:
                        `url(${backgroundSvg.src})`,
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                }}>
                <div className=' flex justify-center items-center flex-col'>
                    <h1 className='text-[5rem] font-extrabold text-gray-100'>Our Software Features</h1>
                    <h1 className='text-[5rem] bg-gradient-to-r from-blue-500 to-teal-400 md:text-8xl sm:text-6xl  font-extrabold text-transparent bg-clip-text'>wonderful</h1>
                    <p className='text-lg text-white mt-3'>How agile teams build and support world class software</p>
                    <p className='text-lg text-white flex flex-col justify-center text-center'>
                        <span>

                            Use the interactive timeline to try adding epics, mapping work items, dependencies,
                        </span>
                        <span>

                            and releases on a timeline. Timelines keep your teams and stakeholders in sync
                        </span>
                    </p>
                    <div>
                        <button className=' mt-3 text-gray-100   bg-indigo-600 hover:bg-indigo-700 font-bold px-3 py-2  rounded-lg outline-none'>Get it free</button>
                        <button className=' ms-5 mt-5 text-gray-100  bg-gray-500 font-bold px-3 py-2 rounded-lg outline-none hover:bg-gray-700'> Learn More</button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default HeroHome