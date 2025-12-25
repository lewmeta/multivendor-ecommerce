import Logo from "@/components/common/Logo";
import { currentUser } from "@clerk/nextjs/server";
import UserInfo from "./user-info";
import SidebarAdmin from "./sidebar-admin";
import { AdminDashboardSidebarOptions } from "@/constants/data";

interface SidebarProps {
    isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = async ({ isAdmin }) => {
    const user = await currentUser();

    return (
        <div className="fixed bottom-0 left-0 top-0 flex h-screen w-[300px] flex-col border-r p-4">
            {/* Logo */}
            <Logo width="100px" height="100px" />
            <span className="mt-3" />
            {/* User info */}
            {user && <UserInfo user={user} />}

            {/* Handle admin checks */}
            {isAdmin ? (<SidebarAdmin  menuLinks={AdminDashboardSidebarOptions}/>) : (<span>Seller</span>)}
        </div>
    );
};

export default Sidebar;