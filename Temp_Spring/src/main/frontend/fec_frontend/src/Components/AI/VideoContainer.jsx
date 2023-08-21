import React from 'react'

const VideoContainer = () => {
    const videoSrc = 'http://172.20.10.3:5000/video_feed'
    return (
        <div className="col-span-3 mt-5 flex justify-center items-center h-50vw">
            <h1 className='text-2xl '>CONNI</h1>
            <div className="video-container bg-[#F2F7F2] p-4 shadow-lg rounded-lg w-50vw">
                <img src={videoSrc} alt='Conni is an AI model'></img>
            </div>
        </div>
    )
}

export default VideoContainer