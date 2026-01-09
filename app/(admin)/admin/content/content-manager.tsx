"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { useToast } from "@/components/ui/use-toast"
import {
  createDoc,
  updateDoc,
  deleteDoc,
  createFaq,
  updateFaq,
  deleteFaq,
} from "./actions"
import { Plus, Pencil, Trash2, FileText, HelpCircle, Loader2, ExternalLink } from "lucide-react"

interface Doc {
  id: string
  title: string
  description: string | null
  url: string
  category: string
  order: number
}

interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

interface ContentManagerProps {
  docs: Doc[]
  faqs: FAQ[]
}

export function ContentManager({ docs: initialDocs, faqs: initialFaqs }: ContentManagerProps) {
  const [docs, setDocs] = useState(initialDocs)
  const [faqs, setFaqs] = useState(initialFaqs)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  // Document handlers
  const handleCreateDoc = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createDoc({
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        url: formData.get("url") as string,
        category: formData.get("category") as string,
      })

      if (result.success && result.doc) {
        toast({ variant: "success", title: "Document Created" })
        setDocs((prev) => [...prev, result.doc!])
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleUpdateDoc = async (docId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updateDoc(docId, {
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        url: formData.get("url") as string,
        category: formData.get("category") as string,
      })

      if (result.success && result.doc) {
        toast({ variant: "success", title: "Document Updated" })
        setDocs((prev) => prev.map((d) => (d.id === docId ? result.doc! : d)))
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleDeleteDoc = async (docId: string) => {
    startTransition(async () => {
      const result = await deleteDoc(docId)

      if (result.success) {
        toast({ variant: "success", title: "Document Deleted" })
        setDocs((prev) => prev.filter((d) => d.id !== docId))
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  // FAQ handlers
  const handleCreateFaq = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createFaq({
        question: formData.get("question") as string,
        answer: formData.get("answer") as string,
      })

      if (result.success && result.faq) {
        toast({ variant: "success", title: "FAQ Created" })
        setFaqs((prev) => [...prev, result.faq!])
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleUpdateFaq = async (faqId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updateFaq(faqId, {
        question: formData.get("question") as string,
        answer: formData.get("answer") as string,
      })

      if (result.success && result.faq) {
        toast({ variant: "success", title: "FAQ Updated" })
        setFaqs((prev) => prev.map((f) => (f.id === faqId ? result.faq! : f)))
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleDeleteFaq = async (faqId: string) => {
    startTransition(async () => {
      const result = await deleteFaq(faqId)

      if (result.success) {
        toast({ variant: "success", title: "FAQ Deleted" })
        setFaqs((prev) => prev.filter((f) => f.id !== faqId))
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  // Group docs by category
  const docsByCategory = docs.reduce((acc, doc) => {
    const category = doc.category || "General"
    if (!acc[category]) acc[category] = []
    acc[category].push(doc)
    return acc
  }, {} as Record<string, Doc[]>)

  return (
    <Tabs defaultValue="docs" className="space-y-6">
      <TabsList>
        <TabsTrigger value="docs" className="gap-2">
          <FileText className="h-4 w-4" />
          Documents
        </TabsTrigger>
        <TabsTrigger value="faqs" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          FAQs
        </TabsTrigger>
      </TabsList>

      {/* Documents Tab */}
      <TabsContent value="docs" className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Public Documents</h2>
            <p className="text-sm text-muted-foreground">
              Manage documents displayed on the Resources page.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form action={handleCreateDoc}>
                <DialogHeader>
                  <DialogTitle>Add Document</DialogTitle>
                  <DialogDescription>
                    Add a new document to the public Resources page.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-title">Title</Label>
                    <Input id="doc-title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-description">Description</Label>
                    <Textarea id="doc-description" name="description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-url">URL</Label>
                    <Input id="doc-url" name="url" type="url" required placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-category">Category</Label>
                    <Input
                      id="doc-category"
                      name="category"
                      placeholder="e.g., Policies, Compliance"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Document
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {docs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents yet. Add your first document.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {category}
                    <Badge variant="secondary">{categoryDocs.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categoryDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{doc.title}</p>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {doc.description}
                          </p>
                        )}
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-primary hover:underline mt-1"
                        >
                          {doc.url}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <form action={(fd) => handleUpdateDoc(doc.id, fd)}>
                              <DialogHeader>
                                <DialogTitle>Edit Document</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-doc-title">Title</Label>
                                  <Input
                                    id="edit-doc-title"
                                    name="title"
                                    defaultValue={doc.title}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-doc-description">Description</Label>
                                  <Textarea
                                    id="edit-doc-description"
                                    name="description"
                                    defaultValue={doc.description || ""}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-doc-url">URL</Label>
                                  <Input
                                    id="edit-doc-url"
                                    name="url"
                                    type="url"
                                    defaultValue={doc.url}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-doc-category">Category</Label>
                                  <Input
                                    id="edit-doc-category"
                                    name="category"
                                    defaultValue={doc.category}
                                    required
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" disabled={isPending}>
                                  Save
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Document</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{doc.title}&quot;?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteDoc(doc.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      {/* FAQs Tab */}
      <TabsContent value="faqs" className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">
              Manage FAQs displayed on the FAQs page.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form action={handleCreateFaq}>
                <DialogHeader>
                  <DialogTitle>Add FAQ</DialogTitle>
                  <DialogDescription>Add a new frequently asked question.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="faq-question">Question</Label>
                    <Input id="faq-question" name="question" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faq-answer">Answer</Label>
                    <Textarea id="faq-answer" name="answer" required className="min-h-[100px]" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add FAQ
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {faqs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No FAQs yet. Add your first FAQ.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="divide-y pt-6">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Q{index + 1}
                        </Badge>
                        <p className="font-medium">{faq.question}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form action={(fd) => handleUpdateFaq(faq.id, fd)}>
                            <DialogHeader>
                              <DialogTitle>Edit FAQ</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-faq-question">Question</Label>
                                <Input
                                  id="edit-faq-question"
                                  name="question"
                                  defaultValue={faq.question}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-faq-answer">Answer</Label>
                                <Textarea
                                  id="edit-faq-answer"
                                  name="answer"
                                  defaultValue={faq.answer}
                                  required
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" disabled={isPending}>
                                Save
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this FAQ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}

