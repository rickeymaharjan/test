import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "@/components/Header"

const BaseLayout = () => {
  return (
    <div className="flex h-[100vh]">
      <Sidebar />
      <div className="flex flex-col gap-8 py-8 px-10 w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default BaseLayout
