"use client";

import { UsefulProvider } from "./contexts/usefulContext";

export function Providers({ children }: any) {
  return <UsefulProvider>{children}</UsefulProvider>;
}
