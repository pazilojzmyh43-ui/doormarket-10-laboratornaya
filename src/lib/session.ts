import { useLayoutEffect, useState } from "react";

const KEY = "doormarket-admin";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const read = () => setIsAdmin(sessionStorage.getItem(KEY) === "1");
    read();
    setReady(true);
    window.addEventListener("dm-session", read);
    return () => window.removeEventListener("dm-session", read);
  }, []);

  return { isAdmin, ready };
}

export function loginAdmin(login: string, password: string) {
  const ok = login.trim() === "admin" && password === "admin123";
  if (ok) {
    sessionStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event("dm-session"));
  }
  return ok;
}

export function logoutAdmin() {
  sessionStorage.removeItem(KEY);
  window.dispatchEvent(new Event("dm-session"));
}
