import userdefault from '../../Assets/profileicon.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileGrid = () => {
    // gotta remove the fake data
    const [email, setEmail] = useState('root@gmail.com');
    const [loginId, setLoginId] = useState('root');
    const [farmId, setFarmId] = useState('11111');

    // Fetch user info 
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/userInfo');
                const userData = response.data;
                setEmail(userData.email);
                setLoginId(userData.loginId);
                setFarmId(userData.farmId);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="col-span-12 mt-5 ">
            <div className='bg-[#F2F7F2] p-4 rounded-3xl'>
                <h2 className="text-2xl text-blue-900 font-bold mb-4">{loginId}'s profile</h2>
                <div className="flex justify-center items-center p-10">
                    <img
                        className="object-cover h-20 w-20 rounded-full"
                        src={userdefault}
                        alt="default user profile picture"
                    />
                </div>

                <div className="bg-blue-900 rounded-3xl shadow-md">
                    <div className='bg-[#f5fcf5] rounded-3xl'>
                        <div className="bg-[#14213d] p-4 rounded-3xl">
                            <div className="text-white font-bold">ID: {loginId}</div>
                            <div className="text-gray-100 text-sm">Email: {email}</div>
                            <div className="text-gray-100 text-sm">Farm ID: {farmId}</div>
                        </div>
                    </div>

                </div>
            </div >
        </div>

    )
}

export default UserProfileGrid;