"use client"

import { CommandPalette, useCommandPalette } from "@/components/ui/command-palette"

export function CommandPaletteProvider() {
  const { open, setOpen } = useCommandPalette()
  
  return <CommandPalette open={open} onOpenChange={setOpen} />
}




