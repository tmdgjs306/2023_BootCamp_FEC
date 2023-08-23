import React, { useState, useEffect } from 'react';
import axios from 'axios';
// layout
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
import {useNavigate} from "react-router-dom";

const ManageUsers = () => {
    const [users, setUsers] = useState({
        loginId: "",
        email: "",
        farmId : ""
    });
    const [newUserRequests, setNewUserRequests] = useState([]);
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/userInfo');
            let a = JSON.stringify(response.data);
            const json =JSON.parse(a);
            if(users.loginId==="")
                setUsers(json);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchNewUserRequests = async () => {
        try {
            const response = await axios.get('/api/getTempUser');
            if(newUserRequests.length != response.data.length)
                setNewUserRequests(response.data);
        } catch (error) {
            console.error("Error fetching new user requests:", error);
        }
    };

    const handleUserAction = async (actionType, loginId) => {
        const endpoint = actionType === 'accept' ? '/api/acceptUser' : '/api/rejectUser';
        try {
            const response = await axios.post(endpoint, { loginId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(actionType ==="accept")
                alert(response.data.toString());
            else
                alert(`${loginId} 유저가 삭제 되었습니다.`)
            fetchNewUserRequests().then(data=>{}) // Refresh the new user requests after action
        } catch (error) {
            alert(error.response.data.message.toString());
        }
    };
    useEffect(() => {
        fetchUserData().then(data=>{});
        fetchNewUserRequests().then(data=>{});
    });
    console.log(users.farmId);

    return (
        <DashboardLayout pageTitle="MANAGE USERS">
            <div className="col-span-12 mt-5">
                <div className='grid gap-2 grid-cols-1 lg:grid-cols-1'>
                    <div className='bg-[#F2F7F2] p-4 shadow-lg rounded-lg mb-4 pb-10 grid mb-40 pb-10 px-8 mx-4'>
                        <h1 className="font-bold text-base">Users</h1>
                        <div className="mt-4">
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto">
                                    <div className="py-2 align-middle inline-block min-w-full">
                                        <div
                                            className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                            <table className=" min-w-full divide-y divide-gray-200 ">
                                                <thead className="block md:table-header-group">
                                                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Login ID</th>
                                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Farm ID</th>
                                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody className="block md:table-row-group">
                                                <tr>
                                                    <td className="p-2 text-left">{users.email}</td>
                                                    <td className="p-2 text-left">{users.loginId}</td>
                                                    <td className="p-2 text-left">{users.farmId}</td>
                                                    <td className="p-2 text-left">
                                                        {/* Edit and Delete buttons for existing users -> ask leader if it's needed or not? */}
                                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded">Edit</button>
                                                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 border border-orange-500 rounded">Delete</button>
                                                    </td>
                                                </tr>
                                                {newUserRequests.map(request => (
                                                    <tr key={request.id}>
                                                        <td className="p-2 text-left">{request.email}</td>
                                                        <td className="p-2 text-left">{request.loginId}</td>
                                                        <td className="p-2 text-left">{request.farmId}</td>
                                                        <td className="p-2 text-left">
                                                            {/* Accept and Decline buttons for new user requests */}
                                                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 border border-green-500 rounded" onClick={() => handleUserAction('accept', request.loginId)}>Accept</button>
                                                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-2 border border-orange-500 rounded" onClick={() => handleUserAction('decline', request.loginId)}>Decline</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout >
    );
};

export default ManageUsers;

