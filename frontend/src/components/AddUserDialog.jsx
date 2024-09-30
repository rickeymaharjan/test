import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from "axios"
import { useState } from "react"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

const AddUserDialog = ({ children, setMembers }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    department: "",
    photo: "",
    role: "Employee",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axios
        .post("https://assessment-api-biay.onrender.com/users", data)
        .then((response) => {
          console.log(response)
        })
      setMembers((members) => [...members, data])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-full flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full"
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="text"
                  className="w-full"
                  placeholder="Picture"
                  required
                  onChange={(e) => setData({ ...data, photo: e.target.value })}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              {/* Departments */}
              <Select
                onValueChange={(value) =>
                  setData({ ...data, department: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>

              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddUserDialog
