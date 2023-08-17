import React from 'react'
import userdefault from '../../Assets/profileiconn.png';

const UserProfileGrid = () => {
    // get api/userInfo -> email, login ID, farm ID
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
        <div className="h-screen w-full bg-gray-50 flex justify-center items-center">
            <div className="h-56 w-72 absolute flex justify-center items-center">
                <img
                    className="object-cover h-20 w-20 rounded-full"
                    src={userdefault} alt='default user profile picture'
                />
            </div>

            <div
                className="h-56 mx-4 w-5/6 bg-blue-400 rounded-3xl shadow-md sm:w-80 sm:mx-0 "
            >
                <div
                    className=" bg-white h-1/2 w-full rounded-3xl flex flex-col justify-around items-center"
                >
                    <div className="w-full h-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-gray-700 font-bold">{loginId}</h1>
                        <h1 className="text-gray-500 text-sm">{email}</h1>
                        <h1 className="text-gray-500 text-sm">{farmId}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileGrid