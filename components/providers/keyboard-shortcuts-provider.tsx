"use client"

import { useState } from "react"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

export function KeyboardShortcutsProvider() {
  const [open, setOpen] = useState(false)

  return <KeyboardShortcuts open={open} onOpenChange={setOpen} />
}

