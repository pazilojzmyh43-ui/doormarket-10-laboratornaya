import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { logoutAdmin, useAdmin } from "@/lib/session";

const LINKS = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/about", label: "О салоне" },
  { to: "/contacts", label: "Контакты" },
] as const;

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="3" className="fill-ink" />
      <rect x="8" y="5" width="16" height="22" rx="1" className="fill-paper" />
      <circle cx="20.5" cy="16" r="1.15" className="fill-brass" />
    </svg>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isAdmin, ready } = useAdmin();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <Mark />
            <span>
              <span className="block font-display text-2xl leading-none">DoorMarket</span>
              <span className="mt-1 block text-sm text-muted">Салон дверей</span>
            </span>
          </Link>
          <p className="hidden text-right text-sm text-muted sm:block">
            Москва, ул. Строительная, 10
            <br />
            +7 (495) 123-45-67
          </p>
        </div>
      </header>

      <nav className="sticky top-0 z-20 border-b border-line bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          {LINKS.map((link) => {
            const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium ${
                  active ? "bg-ink text-paper" : "bg-paper text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {ready && isAdmin ? (
            <>
              <Link
                to="/admin/category"
                className="inline-flex min-h-11 items-center rounded-full bg-brass-deep px-4 text-sm font-medium text-paper"
              >
                + Категория
              </Link>
              <Link
                to="/admin/item"
                className="inline-flex min-h-11 items-center rounded-full bg-brass-deep px-4 text-sm font-medium text-paper"
              >
                + Товар
              </Link>
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-muted"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/vhod"
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-brass-deep"
            >
              Вход администратора
            </Link>
          )}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DoorMarket — салон дверей</p>
          <p>Пн–пт 10:00–19:00 · Сб 11:00–16:00</p>
        </div>
      </footer>
    </div>
  );
}

export function AdminGate({ children }: { children: ReactNode }) {
  const { isAdmin, ready } = useAdmin();
  if (!ready) {
    return <p className="text-muted">Проверяем доступ…</p>;
  }
  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-xl rounded-card border border-line bg-card p-6">
        <p className="text-sm font-medium tracking-wide text-brass uppercase">Закрытый раздел</p>
        <h1 className="mt-2 text-3xl">Только для администратора</h1>
        <p className="mt-3 text-muted">
          Добавление категорий и товаров скрыто от посетителей. Войдите под учётной записью
          администратора.
        </p>
        <Link
          to="/vhod"
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brass-deep px-5 text-sm font-semibold text-paper"
        >
          Войти
        </Link>
      </section>
    );
  }
  return children;
}
