import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AdminLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
    // Block non-admin users from accessing admin layout
    const user = await currentUser();
    if (user?.privateMetadata?.role !== 'ADMIN') {
        redirect('/');
    }
    return (
        <div className="flex h-screen min-w-full items-center">

            <Sidebar isAdmin/>
            <div className="ml-[300px] h-full w-full">
                {/* Header */}
                <Header />
                {/* Main content */}
                <div className="h-full w-full p-4 pt-[75px]">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout