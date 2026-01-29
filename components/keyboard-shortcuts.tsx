"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCommandPalette } from "@/components/ui/command-palette"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface KeyboardShortcut {
  keys: string[]
  description: string
  action?: () => void
}

export function KeyboardShortcuts({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { setOpen: setCommandPaletteOpen } = useCommandPalette()

  const shortcuts: KeyboardShortcut[] = [
    {
      keys: ["⌘", "K"],
      description: "Open command palette",
      action: () => setCommandPaletteOpen(true),
    },
    {
      keys: ["⌘", "/"],
      description: "Show keyboard shortcuts",
      action: () => onOpenChange(true),
    },
    {
      keys: ["G", "D"],
      description: "Go to dashboard",
      action: () => router.push("/app"),
    },
    {
      keys: ["G", "C"],
      description: "Go to checklist",
      action: () => router.push("/app/checklist"),
    },
    {
      keys: ["G", "S"],
      description: "Go to settings",
      action: () => router.push("/app/settings"),
    },
    {
      keys: ["?"],
      description: "Show keyboard shortcuts",
      action: () => onOpenChange(true),
    },
  ]

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K - Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandPaletteOpen(true)
        onOpenChange(false)
      }

      // Command/Ctrl + / - Show shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault()
        onOpenChange(true)
      }

      // ? - Show shortcuts
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        onOpenChange(true)
      }

      // G + D - Dashboard
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        const handler = (e2: KeyboardEvent) => {
          if (e2.key === "d") {
            e2.preventDefault()
            router.push("/app")
            onOpenChange(false)
          }
          document.removeEventListener("keydown", handler)
        }
        document.addEventListener("keydown", handler)
      }

      // G + C - Checklist
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        const handler = (e2: KeyboardEvent) => {
          if (e2.key === "c") {
            e2.preventDefault()
            router.push("/app/checklist")
            onOpenChange(false)
          }
          document.removeEventListener("keydown", handler)
        }
        document.addEventListener("keydown", handler)
      }

      // G + S - Settings
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        const handler = (e2: KeyboardEvent) => {
          if (e2.key === "s") {
            e2.preventDefault()
            router.push("/app/settings")
            onOpenChange(false)
          }
          document.removeEventListener("keydown", handler)
        }
        document.addEventListener("keydown", handler)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, router, setCommandPaletteOpen, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {shortcuts.map((shortcut, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
            >
              <span className="text-sm">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIdx) => (
                  <React.Fragment key={keyIdx}>
                    <Badge variant="outline" className="font-mono">
                      {key}
                    </Badge>
                    {keyIdx < shortcut.keys.length - 1 && (
                      <span className="text-muted-foreground mx-1">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Add React import
import React from "react"




