import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AdminGate } from "@/components/site-shell";
import { addCategory } from "@/lib/catalog";

export const Route = createFileRoute("/admin/category")({ component: AddCategoryPage });

function AddCategoryPage() {
  return (
    <AdminGate>
      <CategoryForm />
    </AdminGate>
  );
}

function CategoryForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || description.trim().length < 8) {
      setError("Укажите название и описание категории.");
      return;
    }
    addCategory({ name, description });
    void navigate({ to: "/catalog" });
  }

  return (
    <section className="mx-auto max-w-xl">
      <p className="text-sm font-semibold tracking-wide text-brass uppercase">Администратор</p>
      <h1 className="mt-2 text-4xl">Новая категория</h1>
      <p className="mt-3 text-muted">Название и описание. После сохранения откроется каталог.</p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Название
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="min-h-11 rounded-xl border border-line bg-card px-3 font-normal"
            maxLength={80}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Описание
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-32 rounded-xl border border-line bg-card px-3 py-3 font-normal"
            maxLength={400}
            required
          />
        </label>
        {error ? <p className="text-sm text-brass-deep">{error}</p> : null}
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass-deep px-5 text-sm font-semibold text-paper"
        >
          Добавить категорию
        </button>
      </form>
    </section>
  );
}
