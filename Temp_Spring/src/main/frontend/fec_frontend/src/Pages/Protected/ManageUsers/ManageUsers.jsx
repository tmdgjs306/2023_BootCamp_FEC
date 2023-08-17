import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../../Components/Sidebar/SideBar';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [newUserRequests, setNewUserRequests] = useState([]);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/userInfo');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchNewUserRequests = async () => {
        try {
            const response = await axios.get('/api/newUserRequests');
            setNewUserRequests(response.data);
        } catch (error) {
            console.error("Error fetching new user requests:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchNewUserRequests();
    }, []);

    const handleUserAction = async (actionType, userId) => {
        const endpoint = actionType === 'accept' ? '/api/acceptUser' : '/api/declineUser';
        try {
            const response = await axios.post(endpoint, { userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert(response.data.toString());
            fetchNewUserRequests(); // Refresh the new user requests after action
        } catch (error) {
            alert(error.response.data.message.toString());
        }
    };

    return (
        <div className="overflow-hidden w-screen h-screen flex bg-[#14213d]">
            <SideBar />
            <div className="flex-1 flex flex-col ">
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Login ID</th>
                            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Farm ID</th>
                            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="p-2 text-left">{user.name}</td>
                                <td className="p-2 text-left">{user.loginId}</td>
                                <td className="p-2 text-left">{user.farmId}</td>
                                <td className="p-2 text-left">
                                    {/* Edit and Delete buttons for existing users -> ask if it's needed or not? */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {newUserRequests.map(request => (
                            <tr key={request.id}>
                                <td className="p-2 text-left">{request.name}</td>
                                <td className="p-2 text-left">{request.loginId}</td>
                                <td className="p-2 text-left">{request.farmId}</td>
                                <td className="p-2 text-left">
                                    {/* Accept and Decline buttons for new user requests */}
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded" onClick={() => handleUserAction('accept', request.id)}>Accept</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onClick={() => handleUserAction('decline', request.id)}>Decline</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;

