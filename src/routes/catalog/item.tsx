import { createFileRoute, Link } from "@tanstack/react-router";
import { money, useCatalog } from "@/lib/catalog";

export const Route = createFileRoute("/catalog/item")({
  validateSearch: (search: Record<string, unknown>) => {
    const id = Number(search.id);
    return { id: Number.isInteger(id) && id > 0 ? id : 0 };
  },
  component: ItemPage,
});

function ItemPage() {
  const { id } = Route.useSearch();
  const { categories, items } = useCatalog();
  const item = items.find((entry) => entry.id === id);
  const category = categories.find((entry) => entry.id === item?.categoryId);

  if (!item || !category) {
    return (
      <section>
        <h1 className="text-4xl">Модель не найдена</h1>
        <p className="mt-3 text-muted">В адресе нет существующего идентификатора товара.</p>
        <Link to="/catalog" className="mt-6 inline-flex text-sm font-semibold text-brass-deep">
          Вернуться к каталогу
        </Link>
      </section>
    );
  }

  return (
    <article className="grid gap-8 lg:grid-cols-2">
      <img src={item.image} alt={item.name} className="w-full rounded-card object-cover" />
      <div>
        <p className="text-sm text-muted">
          Категория:{" "}
          <Link
            to="/catalog/items"
            search={{ id: category.id }}
            className="font-semibold text-brass-deep"
          >
            {category.name}
          </Link>
        </p>
        <h1 className="mt-2 text-4xl">{item.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-brass-deep">{money(item.price)}</p>
        <h2 className="mt-8 text-2xl">Описание</h2>
        <p className="mt-3 whitespace-pre-line text-muted">{item.fullDescription}</p>
      </div>
    </article>
  );
}
