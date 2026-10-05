"use client";

import { createContext, useContext } from "react";

export type CommandMenuState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

export const CommandMenuContext = createContext<CommandMenuState | null>(null);

export function useCommandMenu() {
  const ctx = useContext(CommandMenuContext);
  if (!ctx) throw new Error("useCommandMenu must be used inside <Providers>");
  return ctx;
}
