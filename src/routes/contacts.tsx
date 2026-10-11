import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contacts")({ component: ContactsPage });

const CARDS = [
  {
    icon: MapPin,
    title: "Адрес",
    lines: ["Москва, ул. Строительная, д. 10", "БЦ «Строитель», офис 305"],
  },
  {
    icon: Phone,
    title: "Телефон",
    lines: ["+7 (800) 555-35-35", "+7 (495) 123-45-67"],
  },
  {
    icon: Mail,
    title: "Почта",
    lines: ["info@doormarket.ru", "sales@doormarket.ru"],
  },
  {
    icon: Clock,
    title: "Часы",
    lines: ["Пн–пт: 10:00–19:00", "Сб: 11:00–16:00", "Вс: выходной"],
  },
];

function ContactsPage() {
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-brass uppercase">Контакты</p>
      <h1 className="mt-2 text-4xl">Как нас найти</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <section key={card.title} className="rounded-card border border-line bg-card p-5">
            <card.icon className="size-5 text-brass-deep" aria-hidden="true" />
            <h2 className="mt-3 text-2xl">{card.title}</h2>
            {card.lines.map((line) => (
              <p key={line} className="mt-1 text-muted">
                {line}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
