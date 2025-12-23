import { ModeToggle } from "@/components/common/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Home: React.FC = async () => {
  const user = await currentUser();
  return (
    <div className="w-full min-h-screen flex items-start justify-between p-4">
      <span className="text-xl font-bold">
        E-commerce Platform
      </span>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {user ? <UserButton /> : null}
      </div>
    </div>
  );
}

export default Home;