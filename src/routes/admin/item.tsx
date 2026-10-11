import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AdminGate } from "@/components/site-shell";
import { addItem, fileToJpeg, useCatalog } from "@/lib/catalog";

export const Route = createFileRoute("/admin/item")({ component: AddItemPage });

function AddItemPage() {
  return (
    <AdminGate>
      <ItemForm />
    </AdminGate>
  );
}

function ItemForm() {
  const navigate = useNavigate();
  const { categories } = useCatalog();
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(String(categories[0]?.id ?? ""));
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const numericPrice = Number(price.replace(",", "."));
    if (name.trim().length < 2) {
      setError("Укажите название.");
      return;
    }
    if (shortDescription.trim().length < 8 || fullDescription.trim().length < 12) {
      setError("Заполните краткое и полное описание.");
      return;
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError("Цена должна быть больше нуля.");
      return;
    }
    if (!file) {
      setError("Выберите файл картинки.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Нужен файл изображения.");
      return;
    }
    const selected = Number(categoryId);
    if (!categories.some((category) => category.id === selected)) {
      setError("Выберите категорию.");
      return;
    }
    setPending(true);
    setError("");
    try {
      const image = await fileToJpeg(file);
      addItem({
        name: name.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        price: Math.round(numericPrice),
        image,
        categoryId: selected,
      });
      void navigate({ to: "/catalog" });
    } catch {
      setError("Не удалось прочитать картинку. Выберите другой файл.");
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl">
      <p className="text-sm font-semibold tracking-wide text-brass uppercase">Администратор</p>
      <h1 className="mt-2 text-4xl">Новый элемент каталога</h1>
      <p className="mt-3 text-muted">
        Название, краткое и полное описание, цена, картинка и категория. После добавления
        откроется страница каталога.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Название
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="min-h-11 rounded-xl border border-line bg-card px-3 font-normal"
            maxLength={120}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Краткое описание
          <textarea
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            className="min-h-20 rounded-xl border border-line bg-card px-3 py-3 font-normal"
            maxLength={240}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Полное описание
          <textarea
            value={fullDescription}
            onChange={(event) => setFullDescription(event.target.value)}
            className="min-h-32 rounded-xl border border-line bg-card px-3 py-3 font-normal"
            maxLength={1200}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Цена, ₽
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            inputMode="decimal"
            className="min-h-11 rounded-xl border border-line bg-card px-3 font-normal"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Картинка
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="min-h-11 rounded-xl border border-line bg-card px-3 py-2 font-normal"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Категория
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="min-h-11 rounded-xl border border-line bg-card px-3 font-normal"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        {error ? <p className="text-sm text-brass-deep">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass-deep px-5 text-sm font-semibold text-paper disabled:opacity-60"
        >
          {pending ? "Сохраняем…" : "Добавить в каталог"}
        </button>
      </form>
    </section>
  );
}
