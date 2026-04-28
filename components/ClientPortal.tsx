"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

export function ClientPortal({ children, id = "root-portal" }: { children: ReactNode; id?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const target = document.getElementById(id);
  if (!target) return null;

  return createPortal(children, target);
}
