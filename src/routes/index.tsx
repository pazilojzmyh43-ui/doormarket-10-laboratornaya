import { createFileRoute, Link } from "@tanstack/react-router";
import { SEED_CATEGORIES } from "@/lib/catalog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="grid gap-10">
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brass uppercase">Салон с 2015 года</p>
          <h1 className="mt-3 max-w-xl text-4xl sm:text-5xl">Двери, которые держат тишину дома</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            DoorMarket — каталог межкомнатных, входных и раздвижных дверей. Сначала выбираете
            категорию, затем модель: фото, короткое описание и цена, а по названию — полное
            описание.
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brass-deep px-6 text-sm font-semibold text-paper"
          >
            Открыть каталог
          </Link>
        </div>
        <img
          src="/media/products/4.jpg"
          alt="Глухая дверь под дуб в современной квартире"
          className="aspect-[4/3] w-full rounded-card object-cover"
        />
      </section>

      <section>
        <h2 className="text-3xl">Три раздела каталога</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {SEED_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to="/catalog/items"
              search={{ id: category.id }}
              className="flex min-h-44 flex-col justify-between rounded-card border border-line bg-card p-5"
            >
              <span>
                <span className="text-sm text-brass">Категория {category.id}</span>
                <span className="mt-2 block font-display text-2xl">{category.name}</span>
                <span className="mt-2 block text-sm text-muted">{category.description}</span>
              </span>
              <span className="mt-4 text-sm font-semibold text-brass-deep">Смотреть модели</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
