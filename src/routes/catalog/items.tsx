import { createFileRoute, Link } from "@tanstack/react-router";
import { money, useCatalog } from "@/lib/catalog";

export const Route = createFileRoute("/catalog/items")({
  validateSearch: (search: Record<string, unknown>) => {
    const id = Number(search.id);
    return { id: Number.isInteger(id) && id > 0 ? id : 0 };
  },
  component: CategoryItemsPage,
});

function CategoryItemsPage() {
  const { id } = Route.useSearch();
  const { categories, items } = useCatalog();
  const category = categories.find((item) => item.id === id);
  const products = items.filter((item) => item.categoryId === id);

  if (!category) {
    return (
      <section>
        <h1 className="text-4xl">Категория не найдена</h1>
        <p className="mt-3 text-muted">В адресе нет существующего идентификатора категории.</p>
        <Link to="/catalog" className="mt-6 inline-flex text-sm font-semibold text-brass-deep">
          Вернуться к каталогу
        </Link>
      </section>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted">
        <Link to="/catalog" className="font-semibold text-brass-deep">
          Каталог
        </Link>
        <span> · идентификатор {category.id}</span>
      </p>
      <h1 className="mt-2 text-4xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-muted">{category.description}</p>
      {products.length === 0 ? (
        <p className="mt-8 text-muted">В этой категории пока нет моделей.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-card border border-line bg-card">
              <Link to="/catalog/item" search={{ id: product.id }} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-2xl">
                  <Link to="/catalog/item" search={{ id: product.id }} className="hover:text-brass-deep">
                    {product.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">{product.shortDescription}</p>
                <p className="mt-4 font-semibold text-brass-deep">{money(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
