"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, CheckCircle2, Info, AlertTriangle, FileText, UserCheck, Megaphone, Loader2, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { markAsRead, markAllAsRead, deleteNotification } from "@/lib/notifications"
import type { NotificationType } from "@prisma/client"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  link: string | null
  createdAt: Date
}

interface NotificationsDropdownProps {
  initialNotifications: Notification[]
  initialUnreadCount: number
}

const typeIcons: Record<NotificationType, typeof Info> = {
  INFO: Info,
  SUCCESS: CheckCircle2,
  WARNING: AlertTriangle,
  CHECKLIST_UPDATE: FileText,
  ACCOUNT_APPROVED: UserCheck,
  NEW_DOCUMENT: FileText,
  ANNOUNCEMENT: Megaphone,
}

const typeColors: Record<NotificationType, string> = {
  INFO: "text-blue-500",
  SUCCESS: "text-green-500",
  WARNING: "text-yellow-500",
  CHECKLIST_UPDATE: "text-purple-500",
  ACCOUNT_APPROVED: "text-green-500",
  NEW_DOCUMENT: "text-blue-500",
  ANNOUNCEMENT: "text-orange-500",
}

export function NotificationsDropdown({
  initialNotifications,
  initialUnreadCount,
}: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setNotifications(initialNotifications)
    setUnreadCount(initialUnreadCount)
  }, [initialNotifications, initialUnreadCount])

  function handleMarkAsRead(id: string) {
    startTransition(async () => {
      await markAsRead(id)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    })
  }

  function handleMarkAllAsRead() {
    startTransition(async () => {
      await markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteNotification(id)
      const notification = notifications.find((n) => n.id === id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      if (notification && !notification.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    })
  }

  function formatTime(date: Date) {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(date).toLocaleDateString()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={handleMarkAllAsRead}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </>
              )}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = typeIcons[notification.type]
              const content = (
                <div
                  className={cn(
                    "flex gap-3 p-3 cursor-pointer transition-colors",
                    !notification.read && "bg-accent/50"
                  )}
                >
                  <div className={cn("flex-shrink-0 mt-0.5", typeColors[notification.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleMarkAsRead(notification.id)
                        }}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete(notification.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )

              if (notification.link) {
                return (
                  <Link
                    key={notification.id}
                    href={notification.link}
                    onClick={() => {
                      if (!notification.read) {
                        handleMarkAsRead(notification.id)
                      }
                      setIsOpen(false)
                    }}
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-0 focus:bg-transparent"
                  onSelect={(e) => e.preventDefault()}
                >
                  {content}
                </DropdownMenuItem>
              )
            })
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

