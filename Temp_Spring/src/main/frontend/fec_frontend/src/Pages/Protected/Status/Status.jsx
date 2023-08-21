import React from 'react';
import DashboardLayout from '../../../Components/Layout/DashboardLayout';
import PlantStatusMain from '../../../Components/PlantStatusMain.jsx/PlantStatusMain';
import VideoContainer from '../../../Components/AI/VideoContainer'

const Status = () => {
    return (
        <DashboardLayout pageTitle="PLANT STATUS">
            <PlantStatusMain />
            <VideoContainer />
        </DashboardLayout>

    )
}

export default Status;