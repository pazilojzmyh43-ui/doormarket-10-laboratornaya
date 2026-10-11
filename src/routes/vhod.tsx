import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { loginAdmin, useAdmin } from "@/lib/session";

export const Route = createFileRoute("/vhod")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!loginAdmin(login, password)) {
      setError("Неверный логин или пароль.");
      return;
    }
    void navigate({ to: "/catalog" });
  }

  if (isAdmin) {
    return (
      <section className="mx-auto max-w-xl">
        <h1 className="text-4xl">Вы уже вошли</h1>
        <p className="mt-3 text-muted">В меню появились пункты «+ Категория» и «+ Товар».</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl">
      <p className="text-sm font-semibold tracking-wide text-brass uppercase">Администратор</p>
      <h1 className="mt-2 text-4xl">Вход</h1>
      <p className="mt-3 text-muted">
        Пункты добавления категории и товара видны только после входа. Для проверки лабораторной:
        логин admin, пароль admin123.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Логин
          <input
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            autoComplete="username"
            className="min-h-11 rounded-xl border border-line bg-card px-3 font-normal"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Пароль
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="min-h-11 rounded-xl border border-line bg-card px-3 font-normal"
            required
          />
        </label>
        {error ? <p className="text-sm text-brass-deep">{error}</p> : null}
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass-deep px-5 text-sm font-semibold text-paper"
        >
          Войти
        </button>
      </form>
    </section>
  );
}
