import SideBar from '../../../Components/Sidebar/SideBar';
import Header from '../../../Components/Header/Header';
import userProfileGrid from '../../Protected/Profile/UserProfile';
const ManageUsers = () => {
    return (
        <div className="overflow-hidden w-screen h-screen flex bg-[#14213d]">
            <SideBar />
            <Header />
            <div className="flex-1 flex flex-col ">
                <userProfileGrid />
            </div>
        </div>

    )
}

export default ManageUsers;