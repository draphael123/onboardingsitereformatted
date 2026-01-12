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
  createSection, 
  updateSection, 
  deleteSection,
  createItem, 
  updateItem, 
  deleteItem,
  syncTemplateToUsers 
} from "./actions"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  Loader2,
  RefreshCw
} from "lucide-react"
import type { Role } from "@prisma/client"

interface TemplateItem {
  id: string
  title: string
  description: string | null
  linkUrl: string | null
  fileUrl: string | null
  dueInDays: number | null
  order: number
}

interface TemplateSection {
  id: string
  title: string
  order: number
  items: TemplateItem[]
}

interface Template {
  id: string
  role: Role
  title: string
  sections: TemplateSection[]
}

interface TemplatesManagerProps {
  templates: Template[]
}

export function TemplatesManager({ templates: initialTemplates }: TemplatesManagerProps) {
  const [templates, setTemplates] = useState(initialTemplates)
  const [activeRole, setActiveRole] = useState<Role>(templates[0]?.role || "CS")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [syncUpdateContent, setSyncUpdateContent] = useState(false)
  const [isSyncDialogOpen, setIsSyncDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const activeTemplate = templates.find((t) => t.role === activeRole)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const handleCreateSection = async (formData: FormData) => {
    if (!activeTemplate) return

    startTransition(async () => {
      const result = await createSection({
        roleTemplateId: activeTemplate.id,
        title: formData.get("title") as string,
      })

      if (result.success && result.section) {
        toast({ variant: "success", title: "Section Created" })
        setTemplates((prev) =>
          prev.map((t) =>
            t.id === activeTemplate.id
              ? { ...t, sections: [...t.sections, { ...result.section!, items: [] }] }
              : t
          )
        )
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleUpdateSection = async (sectionId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updateSection(sectionId, {
        title: formData.get("title") as string,
      })

      if (result.success) {
        toast({ variant: "success", title: "Section Updated" })
        setTemplates((prev) =>
          prev.map((t) => ({
            ...t,
            sections: t.sections.map((s) =>
              s.id === sectionId ? { ...s, title: formData.get("title") as string } : s
            ),
          }))
        )
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleDeleteSection = async (sectionId: string) => {
    startTransition(async () => {
      const result = await deleteSection(sectionId)

      if (result.success) {
        toast({ variant: "success", title: "Section Deleted" })
        setTemplates((prev) =>
          prev.map((t) => ({
            ...t,
            sections: t.sections.filter((s) => s.id !== sectionId),
          }))
        )
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleCreateItem = async (sectionId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await createItem({
        templateSectionId: sectionId,
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        linkUrl: formData.get("linkUrl") as string || null,
        dueInDays: formData.get("dueInDays") ? parseInt(formData.get("dueInDays") as string) : null,
      })

      if (result.success && result.item) {
        toast({ variant: "success", title: "Task Created" })
        setTemplates((prev) =>
          prev.map((t) => ({
            ...t,
            sections: t.sections.map((s) =>
              s.id === sectionId ? { ...s, items: [...s.items, result.item!] } : s
            ),
          }))
        )
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleUpdateItem = async (itemId: string, sectionId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updateItem(itemId, {
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        linkUrl: formData.get("linkUrl") as string || null,
        dueInDays: formData.get("dueInDays") ? parseInt(formData.get("dueInDays") as string) : null,
      })

      if (result.success && result.item) {
        toast({ variant: "success", title: "Task Updated" })
        setTemplates((prev) =>
          prev.map((t) => ({
            ...t,
            sections: t.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: s.items.map((i) => (i.id === itemId ? result.item! : i)) }
                : s
            ),
          }))
        )
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleDeleteItem = async (itemId: string, sectionId: string) => {
    startTransition(async () => {
      const result = await deleteItem(itemId)

      if (result.success) {
        toast({ variant: "success", title: "Task Deleted" })
        setTemplates((prev) =>
          prev.map((t) => ({
            ...t,
            sections: t.sections.map((s) =>
              s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
            ),
          }))
        )
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const handleSyncToUsers = async () => {
    if (!activeTemplate) return

    startTransition(async () => {
      const result = await syncTemplateToUsers(activeTemplate.role, { 
        updateContent: syncUpdateContent 
      })

      if (result.success) {
        const messages = []
        if (result.itemsAdded && result.itemsAdded > 0) {
          messages.push(`Added ${result.itemsAdded} new items`)
        }
        if (result.itemsUpdated && result.itemsUpdated > 0) {
          messages.push(`Updated ${result.itemsUpdated} existing items`)
        }
        if (messages.length === 0) {
          messages.push("No changes needed")
        }
        
        toast({
          variant: "success",
          title: "Sync Complete",
          description: `${messages.join(", ")} for ${result.usersUpdated} users.`,
        })
        setIsSyncDialogOpen(false)
        setSyncUpdateContent(false)
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    })
  }

  const roles: Role[] = ["CS", "MA_BACKOFFICE", "RN", "PROVIDER", "MA_PHARMACY", "OTHER"]

  return (
    <div className="space-y-6">
      <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v as Role)}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            {roles.map((role) => (
              <TabsTrigger key={role} value={role}>
                {role}
              </TabsTrigger>
            ))}
          </TabsList>
          <Dialog open={isSyncDialogOpen} onOpenChange={setIsSyncDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isPending}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync to Users
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sync Template to Users</DialogTitle>
                <DialogDescription>
                  This will add any new template items to existing users with the {activeRole} role.
                  User completion status is always preserved.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
                  <Checkbox
                    id="updateContent"
                    checked={syncUpdateContent}
                    onCheckedChange={(checked) => setSyncUpdateContent(checked === true)}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor="updateContent"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Also update existing item content
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Updates descriptions and links for existing items without changing their completion status.
                      Useful for fixing typos or updating resource links.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSyncDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSyncToUsers} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sync Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {roles.map((role) => {
          const template = templates.find((t) => t.role === role)
          return (
            <TabsContent key={role} value={role} className="space-y-4">
              {!template ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No template found for {role}. Run the seed script to create default templates.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{template.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {template.sections.length} sections,{" "}
                        {template.sections.reduce((acc, s) => acc + s.items.length, 0)} tasks
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Section
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <form action={handleCreateSection}>
                          <DialogHeader>
                            <DialogTitle>Create Section</DialogTitle>
                            <DialogDescription>
                              Add a new section to the {role} onboarding template.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Label htmlFor="section-title">Section Title</Label>
                            <Input
                              id="section-title"
                              name="title"
                              placeholder="e.g., Company Basics"
                              className="mt-2"
                              required
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Create Section
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {template.sections.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                          No sections yet. Add a section to get started.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {template.sections.map((section) => {
                        const isExpanded = expandedSections.has(section.id)
                        return (
                          <Card key={section.id}>
                            <CardHeader
                              className="cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => toggleSection(section.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {isExpanded ? (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                  )}
                                  <CardTitle className="text-lg">{section.title}</CardTitle>
                                  <Badge variant="secondary">
                                    {section.items.length} tasks
                                  </Badge>
                                </div>
                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                  {/* Edit Section */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <form action={(fd) => handleUpdateSection(section.id, fd)}>
                                        <DialogHeader>
                                          <DialogTitle>Edit Section</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <Label htmlFor="edit-section-title">Section Title</Label>
                                          <Input
                                            id="edit-section-title"
                                            name="title"
                                            defaultValue={section.title}
                                            className="mt-2"
                                            required
                                          />
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit" disabled={isPending}>
                                            Save
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                  {/* Delete Section */}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Section</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will delete the section and all its tasks. This does not
                                          affect existing user checklists.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteSection(section.id)}
                                          className="bg-destructive text-destructive-foreground"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            </CardHeader>
                            {isExpanded && (
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  {section.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium">{item.title}</p>
                                        {item.description && (
                                          <p className="text-sm text-muted-foreground truncate">
                                            {item.description}
                                          </p>
                                        )}
                                        <div className="flex gap-2 mt-1">
                                          {item.linkUrl && (
                                            <Badge variant="outline" className="text-xs">
                                              Has Link
                                            </Badge>
                                          )}
                                          {item.dueInDays && (
                                            <Badge variant="outline" className="text-xs">
                                              Due: {item.dueInDays} days
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex gap-1">
                                        {/* Edit Item */}
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                              <Pencil className="h-4 w-4" />
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <form
                                              action={(fd) => handleUpdateItem(item.id, section.id, fd)}
                                            >
                                              <DialogHeader>
                                                <DialogTitle>Edit Task</DialogTitle>
                                              </DialogHeader>
                                              <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                  <Label htmlFor="item-title">Title</Label>
                                                  <Input
                                                    id="item-title"
                                                    name="title"
                                                    defaultValue={item.title}
                                                    required
                                                  />
                                                </div>
                                                <div className="space-y-2">
                                                  <Label htmlFor="item-description">Description</Label>
                                                  <Textarea
                                                    id="item-description"
                                                    name="description"
                                                    defaultValue={item.description || ""}
                                                  />
                                                </div>
                                                <div className="space-y-2">
                                                  <Label htmlFor="item-link">Link URL</Label>
                                                  <Input
                                                    id="item-link"
                                                    name="linkUrl"
                                                    type="url"
                                                    defaultValue={item.linkUrl || ""}
                                                    placeholder="https://..."
                                                  />
                                                </div>
                                                <div className="space-y-2">
                                                  <Label htmlFor="item-due">Due In (Days)</Label>
                                                  <Input
                                                    id="item-due"
                                                    name="dueInDays"
                                                    type="number"
                                                    defaultValue={item.dueInDays || ""}
                                                    placeholder="e.g., 7"
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
                                        {/* Delete Item */}
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-destructive"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Delete this task from the template? Existing user
                                                checklists will not be affected.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                                              <AlertDialogAction
                                                onClick={() => handleDeleteItem(item.id, section.id)}
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
                                  {/* Add Item */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" className="w-full mt-2">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Task
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <form action={(fd) => handleCreateItem(section.id, fd)}>
                                        <DialogHeader>
                                          <DialogTitle>Create Task</DialogTitle>
                                          <DialogDescription>
                                            Add a new task to {section.title}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="new-item-title">Title</Label>
                                            <Input
                                              id="new-item-title"
                                              name="title"
                                              placeholder="e.g., Complete safety training"
                                              required
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="new-item-description">Description</Label>
                                            <Textarea
                                              id="new-item-description"
                                              name="description"
                                              placeholder="Optional description..."
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="new-item-link">Link URL</Label>
                                            <Input
                                              id="new-item-link"
                                              name="linkUrl"
                                              type="url"
                                              placeholder="https://..."
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="new-item-due">Due In (Days)</Label>
                                            <Input
                                              id="new-item-due"
                                              name="dueInDays"
                                              type="number"
                                              placeholder="e.g., 7"
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit" disabled={isPending}>
                                            {isPending && (
                                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Create Task
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

