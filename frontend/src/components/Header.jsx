import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

const Header = () => {
  return (
    <div className="flex justify-end">
      <div className="flex justify-center items-center gap-5">
        <p>notifications</p>

        {/* profile */}
        <div className="flex items-center gap-2">
          <Avatar className="w-[32px] h-[32px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="text-base text-gray-600">John Hopkins</span>
        </div>
      </div>
    </div>
  )
}

export default Header
