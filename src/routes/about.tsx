import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold tracking-wide text-brass uppercase">О салоне</p>
      <h1 className="mt-2 text-4xl">DoorMarket</h1>
      <div className="mt-6 grid gap-4">
        <section className="rounded-card border border-line bg-card p-5">
          <h2 className="text-2xl">Кто мы</h2>
          <p className="mt-2 text-muted">
            Салон дверей работает с 2015 года. Подбираем полотна под проём, а не уговариваем взять
            то, что осталось на складе. В каталоге три постоянных раздела и модели, которые можно
            посмотреть в шоуруме.
          </p>
        </section>
        <section className="rounded-card border border-line bg-card p-5">
          <h2 className="text-2xl">Как устроен каталог</h2>
          <p className="mt-2 text-muted">
            У категории есть название и описание. У модели — название, краткое и полное описание,
            цена, картинка и ссылка на категорию. Новые записи добавляет администратор.
          </p>
        </section>
        <section className="rounded-card border border-line bg-card p-5">
          <h2 className="text-2xl">Что входит в заказ</h2>
          <ul className="mt-2 grid gap-2 text-muted">
            <li>Замер проёма по Москве в будни.</li>
            <li>Монтаж и регулировка петель в первый год.</li>
            <li>Доставка по городу от 50 000 ₽.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
