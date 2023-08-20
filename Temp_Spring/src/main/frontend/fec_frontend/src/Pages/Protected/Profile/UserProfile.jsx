import React from 'react';
import UserProfileGrid from '../../../Components/Profile/userProfileGrid';
import DashboardLayout from '../../../Components/Layout/DashboardLayout';

const UserProfile = () => {
    return (
        <DashboardLayout pageTitle="PROFILE">
            <UserProfileGrid />
        </DashboardLayout >
    )
}

export default UserProfile