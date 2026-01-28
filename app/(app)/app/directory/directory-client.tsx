"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Mail, 
  UserCog,
  Filter,
  X,
  Download
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DirectoryUser {
  id: string
  name: string
  email: string
  role: string
  roleLabel: string
  roleColor: string
  image: string | null
}

interface DirectoryClientProps {
  initialUsers: DirectoryUser[]
}

export function DirectoryClient({ initialUsers }: DirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  // Get unique roles for filter
  const uniqueRoles = useMemo(() => {
    const roles = new Set(initialUsers.map((u) => u.role))
    return Array.from(roles).sort()
  }, [initialUsers])

  // Filter users
  const filteredUsers = useMemo(() => {
    let filtered = initialUsers

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.roleLabel.toLowerCase().includes(query)
      )
    }

    // Filter by role
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    return filtered
  }, [initialUsers, searchQuery, roleFilter])

  // Download filtered users as CSV
  const handleDownload = () => {
    if (filteredUsers.length === 0) {
      return
    }

    // Create CSV headers
    const headers = ["Name", "Email", "Role", "Department"]
    
    // Create CSV rows
    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.roleLabel,
      user.role,
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => 
        row.map((cell) => {
          // Escape commas and quotes in CSV
          const cellStr = String(cell || "")
          if (cellStr.includes(",") || cellStr.includes('"') || cellStr.includes("\n")) {
            return `"${cellStr.replace(/"/g, '""')}"`
          }
          return cellStr
        }).join(",")
      ),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    // Generate filename with current date and filter info
    const date = new Date().toISOString().split("T")[0]
    let filename = `staff-directory-${date}`
    
    if (roleFilter !== "all") {
      const roleName = filteredUsers[0]?.roleLabel || roleFilter
      filename += `-${roleName.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`
    }
    
    if (searchQuery.trim()) {
      filename += `-search-${searchQuery.substring(0, 20).replace(/[^a-z0-9]/gi, "-").toLowerCase()}`
    }
    
    filename += ".csv"
    
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {uniqueRoles.map((role) => {
                const user = initialUsers.find((u) => u.role === role)
                return (
                  <SelectItem key={role} value={role}>
                    {user?.roleLabel || role}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={filteredUsers.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
          {(searchQuery || roleFilter !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setRoleFilter("all")
              }}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {initialUsers.length} employees
        </div>

        {/* User Grid */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserCog className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No employees found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => {
              const initials = user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)

              return (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.image || undefined} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{user.name}</h3>
                            <p className="text-sm text-muted-foreground truncate flex items-center gap-1 mt-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${user.roleColor} text-xs`}>
                          {user.roleLabel}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

