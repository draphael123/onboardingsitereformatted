"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"
import { createUser, updateUser, deleteUser, resetPassword, approveUser, rejectUser } from "./actions"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Key,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import type { Role, UserStatus } from "@prisma/client"

interface UserWithChecklist {
  id: string
  name: string | null
  email: string
  role: Role
  status: UserStatus
  createdAt: Date
  checklist: {
    sections: {
      items: { status: string }[]
    }[]
  } | null
}

interface UsersTableProps {
  users: UserWithChecklist[]
}

const roles: Role[] = ["ADMIN", "CS", "NP", "RN", "MA"]

function calculateProgress(checklist: UserWithChecklist["checklist"]) {
  if (!checklist) return { completed: 0, total: 0, percentage: 0 }
  const items = checklist.sections.flatMap((s) => s.items)
  const total = items.length
  const completed = items.filter((i) => i.status === "COMPLETE").length
  return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 }
}

const statusConfig = {
  PENDING: { label: "Pending", variant: "warning" as const, icon: Clock },
  APPROVED: { label: "Approved", variant: "success" as const, icon: CheckCircle2 },
  REJECTED: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserWithChecklist | null>(null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const pendingCount = users.filter((u) => u.status === "PENDING").length

  const handleCreate = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createUser({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as Role,
      })

      if (result.success && result.user) {
        toast({
          variant: "success",
          title: "User Created",
          description: `${result.user.email} has been created successfully.`,
        })
        setUsers((prev) => [{ ...result.user!, status: "APPROVED" as UserStatus, checklist: null }, ...prev])
        setIsCreateOpen(false)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to create user",
        })
      }
    })
  }

  const handleUpdate = async (formData: FormData) => {
    if (!editingUser) return

    startTransition(async () => {
      const result = await updateUser(editingUser.id, {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as Role,
      })

      if (result.success && result.user) {
        toast({
          variant: "success",
          title: "User Updated",
          description: "User has been updated successfully.",
        })
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...result.user } : u))
        )
        setEditingUser(null)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to update user",
        })
      }
    })
  }

  const handleDelete = async (userId: string) => {
    startTransition(async () => {
      const result = await deleteUser(userId)

      if (result.success) {
        toast({
          variant: "success",
          title: "User Deleted",
          description: "User has been deleted successfully.",
        })
        setUsers((prev) => prev.filter((u) => u.id !== userId))
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to delete user",
        })
      }
    })
  }

  const handleResetPassword = async (userId: string, email: string) => {
    startTransition(async () => {
      const result = await resetPassword(userId)

      if (result.success) {
        toast({
          variant: "success",
          title: "Password Reset",
          description: `Temporary password for ${email}: ${result.tempPassword}`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to reset password",
        })
      }
    })
  }

  const handleApprove = async (userId: string) => {
    startTransition(async () => {
      const result = await approveUser(userId)

      if (result.success) {
        toast({
          variant: "success",
          title: "User Approved",
          description: "User has been approved and notified via email.",
        })
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status: "APPROVED" as UserStatus } : u))
        )
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to approve user",
        })
      }
    })
  }

  const handleReject = async (userId: string) => {
    startTransition(async () => {
      const result = await rejectUser(userId)

      if (result.success) {
        toast({
          title: "User Rejected",
          description: "User access has been rejected.",
        })
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status: "REJECTED" as UserStatus } : u))
        )
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to reject user",
        })
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form action={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new team member to the onboarding system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@fountainvitality.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Temporary Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="text"
                      placeholder="TempPass123!"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" defaultValue="CS">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Status Filter Tabs */}
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as "all" | UserStatus)}>
          <TabsList>
            <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
            <TabsTrigger value="PENDING" className="relative">
              Pending
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="APPROVED">Approved</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Progress</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Created</th>
              <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-24 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const progress = calculateProgress(user.checklist)
                const StatusIcon = statusConfig[user.status].icon
                return (
                  <tr key={user.id} className="border-b">
                    <td className="p-4 font-medium">{user.name || "-"}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusConfig[user.status].variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[user.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {user.status === "APPROVED" && user.checklist ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {progress.percentage}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Approve/Reject for pending users */}
                        {user.status === "PENDING" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(user.id)}
                              disabled={isPending}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(user.id)}
                              disabled={isPending}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}

                        {/* Re-approve rejected users */}
                        {user.status === "REJECTED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(user.id)}
                            disabled={isPending}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        )}

                        {/* Edit */}
                        <Dialog
                          open={editingUser?.id === user.id}
                          onOpenChange={(open) => !open && setEditingUser(null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingUser(user)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <form action={handleUpdate}>
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogDescription>
                                  Update user information.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Name</Label>
                                  <Input
                                    id="edit-name"
                                    name="name"
                                    defaultValue={editingUser?.name || ""}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input
                                    id="edit-email"
                                    name="email"
                                    type="email"
                                    defaultValue={editingUser?.email}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Role</Label>
                                  <Select name="role" defaultValue={editingUser?.role}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {roles.map((role) => (
                                        <SelectItem key={role} value={role}>
                                          {role}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" disabled={isPending}>
                                  {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  )}
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        {/* Reset Password */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Key className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reset Password</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will generate a new temporary password for {user.email}.
                                The user will need to use this password to log in.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleResetPassword(user.id, user.email)}
                              >
                                Reset Password
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.email}? This action
                                cannot be undone and will remove all their data including
                                their checklist progress.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
