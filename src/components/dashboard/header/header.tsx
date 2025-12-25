import { ModeToggle } from "@/components/common/ModeToggle"
import { UserButton } from "@clerk/nextjs"

const Header = () => {
  return (
       <div className="fixed left-0 right-0 top-0 z-[20] flex items-center gap-4 border-b-[1px] bg-background/80 p-4 backdrop-blur-md md:left-[300px]">
      <div className="ml-auto flex items-center gap-2">
        <UserButton />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header