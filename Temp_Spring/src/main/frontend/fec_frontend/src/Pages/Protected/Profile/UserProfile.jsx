import React from 'react';
import SideBar from '../../../Components/Sidebar/SideBar';
// import Header from '../../../Components/Header/Header';

//  get api/userInfo -> email, login ID, farm ID
// jsonObject.put("loginId",user.getLoginId());
// jsonObject.put("email",user.getEmail());
// jsonObject.put("farmId",user.getFarmId());

const UserProfile = () => {

    return (
        <div className="flex-1 p-4 w-full md:w-1/2 bg-[#14213d]">
            <SideBar />
            <div className='relative max-w-md w-full'>
                <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                    <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                        Users table
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile