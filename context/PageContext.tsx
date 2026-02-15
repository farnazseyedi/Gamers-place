"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type PageContextType = {
  page: number;
  setPage: (p: number) => void;
};

const PageContext = createContext<PageContextType | null>(null);

export function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) {
    throw new Error("usePage must be used inside <PageProvider>");
  }
  return ctx;
}

export function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPageState] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gamesPage");
    setPageState(saved ? Number(saved) : 1);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (page !== null) {
      localStorage.setItem("gamesPage", page.toString());
    }
  }, [page]);

  useEffect(() => {
    if (page !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  if (!hydrated || page === null) {
    return null;
  }

  const setPage = (p: number) => setPageState(p);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}
