"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import type { NotificationType } from "@prisma/client"

export async function getNotifications() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  const notifications = await db.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return notifications
}

export async function getUnreadCount() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return 0
  }

  const count = await db.notification.count({
    where: {
      userId: session.user.id,
      read: false,
    },
  })

  return count
}

export async function markAsRead(notificationId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { success: false }
  }

  await db.notification.update({
    where: {
      id: notificationId,
      userId: session.user.id,
    },
    data: { read: true },
  })

  revalidatePath("/app")
  return { success: true }
}

export async function markAllAsRead() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { success: false }
  }

  await db.notification.updateMany({
    where: {
      userId: session.user.id,
      read: false,
    },
    data: { read: true },
  })

  revalidatePath("/app")
  return { success: true }
}

export async function deleteNotification(notificationId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { success: false }
  }

  await db.notification.delete({
    where: {
      id: notificationId,
      userId: session.user.id,
    },
  })

  revalidatePath("/app")
  return { success: true }
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  link,
}: {
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
}) {
  await db.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      link,
    },
  })
}

export async function createBulkNotifications({
  userIds,
  type,
  title,
  message,
  link,
}: {
  userIds: string[]
  type: NotificationType
  title: string
  message: string
  link?: string
}) {
  await db.notification.createMany({
    data: userIds.map((userId) => ({
      userId,
      type,
      title,
      message,
      link,
    })),
  })
}

