import { createFileRoute, Link } from "@tanstack/react-router";
import { useCatalog } from "@/lib/catalog";

export const Route = createFileRoute("/catalog/")({ component: CatalogPage });

function CatalogPage() {
  const { categories, items } = useCatalog();

  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-brass uppercase">Каталог</p>
      <h1 className="mt-2 text-4xl">Категории</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Каждая категория ведёт на список моделей. Категория определяется идентификатором в
        адресе страницы.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const count = items.filter((item) => item.categoryId === category.id).length;
          return (
            <Link
              key={category.id}
              to="/catalog/items"
              search={{ id: category.id }}
              className="flex min-h-48 flex-col justify-between rounded-card border border-line bg-card p-5"
            >
              <span>
                <span className="text-sm text-brass">№ {category.id}</span>
                <span className="mt-2 block font-display text-2xl">{category.name}</span>
                <span className="mt-2 block text-sm text-muted">{category.description}</span>
              </span>
              <span className="mt-5 text-sm font-semibold">
                {count} {count === 1 ? "модель" : count < 5 ? "модели" : "моделей"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
