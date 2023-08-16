import SideBar from '../../../Components/Sidebar/SideBar';
import Header from '../../../Components/Header/Header';

const UserProfile = () => {
    return (
        <div className="overflow-hidden w-screen h-screen flex bg-[#14213d]">
            <SideBar />
            <Header />
            <div className="flex-1 flex flex-col ">
                Users
            </div>
        </div>
    )
}

export default UserProfile