import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import AddUserDialog from "../components/AddUserDialog"
import EditUserDialog from "../components/EditUserDialog"

import axios from "axios"
import { useState, useEffect } from "react"

const Members = () => {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState(members)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log(members)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          "https://assessment-api-biay.onrender.com/users"
        )
        setMembers(response.data.data)
        setFilteredMembers(response.data.data) // Initialize filteredMembers
      } catch {
        setError("An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  const departments = [
    "All",
    "R&D",
    "Research",
    "Design",
    "Engineering",
    "Marketing",
    "Sales",
    "Support",
  ]

  const handleDelete = (id) => {
    try {
      axios
        .delete(`https://assessment-api-biay.onrender.com/users/${id}`)
        .then(() => {
          setMembers(members.filter((member) => member._id !== id))
          setFilteredMembers(
            filteredMembers.filter((member) => member._id !== id)
          ) // Update filteredMembers
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id) => {
    axios
      .put(`https://assessment-api-biay.onrender.com/users/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member._id !== id))
        setFilteredMembers(
          filteredMembers.filter((member) => member._id !== id)
        ) // Update filteredMembers
      })
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
    const filteredData = members.filter((member) => {
      return (
        member.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        member.email.toLowerCase().includes(searchValue.toLowerCase())
      )
    })

    setFilteredMembers(filteredData)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Top */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Team</h2>
        </div>

        <div className="flex items-center gap-3">
          <AddUserDialog setMembers={setMembers}>
            <Button>Add Members</Button>
          </AddUserDialog>
          <Input
            onChange={handleSearch}
            placeholder="Search"
            className="min-w-[310px]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {departments.map((item) => (
          <Button key={item} variant="outline" className="rounded-full">
            {item}
          </Button>
        ))}
      </div>

      {/* Users */}
      <div>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <div>
            {filteredMembers.map((member) => (
              <div key={member._id} className="flex flex-col mt-3">
                <div className="flex justify-between items-center">
                  {/* Profile */}
                  <div className="flex gap-3 min-w-[300px]">
                    <div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>

                    <div>
                      <h3 className="">{member.username}</h3>
                      <p>{member.email}</p>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <span>{member.department}</span>
                  </div>

                  {/*  Role */}
                  <div>
                    <span>{member.role}</span>
                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3">
                    <EditUserDialog member={member} members={members}>
                      <Button onClick={() => handleEdit(members._id)}>
                        Edit
                      </Button>
                    </EditUserDialog>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Members
