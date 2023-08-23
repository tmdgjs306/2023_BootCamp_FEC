import React from 'react'
import Calendar from './Calendar'
import axios from 'axios';

// get datas from backend -> to do axios
const Performancemain = () => {

    return (
        <div className="col-span-3 mt-5 flex justify-center items-center h-50vw">
            <div className='bg-[#F2F7F2] p-4 shadow-lg rounded-lg w-50vw'>
                <Calendar />
            </div>
        </div>
    )
}

export default Performancemain;