"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

// Document Actions
export async function createDoc(input: {
  title: string
  description?: string | null
  url: string
  category: string
}) {
  try {
    await requireAdmin()

    const lastDoc = await db.publicDoc.findFirst({
      where: { category: input.category },
      orderBy: { order: "desc" },
    })

    const doc = await db.publicDoc.create({
      data: {
        title: input.title,
        description: input.description,
        url: input.url,
        category: input.category,
        order: (lastDoc?.order ?? -1) + 1,
      },
    })

    revalidatePath("/admin/content")
    revalidatePath("/docs")
    return { success: true, doc }
  } catch (error) {
    console.error("Error creating document:", error)
    return { success: false, error: "Failed to create document" }
  }
}

export async function updateDoc(
  docId: string,
  input: {
    title: string
    description?: string | null
    url: string
    category: string
  }
) {
  try {
    await requireAdmin()

    const doc = await db.publicDoc.update({
      where: { id: docId },
      data: {
        title: input.title,
        description: input.description,
        url: input.url,
        category: input.category,
      },
    })

    revalidatePath("/admin/content")
    revalidatePath("/docs")
    return { success: true, doc }
  } catch (error) {
    console.error("Error updating document:", error)
    return { success: false, error: "Failed to update document" }
  }
}

export async function deleteDoc(docId: string) {
  try {
    await requireAdmin()

    await db.publicDoc.delete({
      where: { id: docId },
    })

    revalidatePath("/admin/content")
    revalidatePath("/docs")
    return { success: true }
  } catch (error) {
    console.error("Error deleting document:", error)
    return { success: false, error: "Failed to delete document" }
  }
}

// FAQ Actions
export async function createFaq(input: { question: string; answer: string }) {
  try {
    await requireAdmin()

    const lastFaq = await db.fAQ.findFirst({
      orderBy: { order: "desc" },
    })

    const faq = await db.fAQ.create({
      data: {
        question: input.question,
        answer: input.answer,
        order: (lastFaq?.order ?? -1) + 1,
      },
    })

    revalidatePath("/admin/content")
    revalidatePath("/faqs")
    return { success: true, faq }
  } catch (error) {
    console.error("Error creating FAQ:", error)
    return { success: false, error: "Failed to create FAQ" }
  }
}

export async function updateFaq(faqId: string, input: { question: string; answer: string }) {
  try {
    await requireAdmin()

    const faq = await db.fAQ.update({
      where: { id: faqId },
      data: {
        question: input.question,
        answer: input.answer,
      },
    })

    revalidatePath("/admin/content")
    revalidatePath("/faqs")
    return { success: true, faq }
  } catch (error) {
    console.error("Error updating FAQ:", error)
    return { success: false, error: "Failed to update FAQ" }
  }
}

export async function deleteFaq(faqId: string) {
  try {
    await requireAdmin()

    await db.fAQ.delete({
      where: { id: faqId },
    })

    revalidatePath("/admin/content")
    revalidatePath("/faqs")
    return { success: true }
  } catch (error) {
    console.error("Error deleting FAQ:", error)
    return { success: false, error: "Failed to delete FAQ" }
  }
}


