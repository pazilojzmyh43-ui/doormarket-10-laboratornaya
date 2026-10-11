import { useLayoutEffect, useState } from "react";

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type CatalogItem = {
  id: number;
  categoryId: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  image: string;
};

export const SEED_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Межкомнатные двери",
    description:
      "Полотна для комнат, кабинета и кухни: глухие, остеклённые и с цветной эмалью.",
  },
  {
    id: 2,
    name: "Входные двери",
    description:
      "Утеплённые двери в квартиру и дом: сталь, два контура уплотнения и надёжные замки.",
  },
  {
    id: 3,
    name: "Раздвижные двери",
    description:
      "Купе, пеналы и перегородки, когда нужно оставить проход свободным.",
  },
];

export const SEED_ITEMS: CatalogItem[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Межкомнатная дверь «Лайн»",
    shortDescription: "Белое полотно с горизонтальными фрезерованными линиями.",
    fullDescription:
      "Спокойная модель для кухни и спальни. Горизонтальные линии собирают свет и не спорят с мебелью. Эмаль матовая, кромка закрыта по периметру, петли скрытые.\n\nПокрытие: эмаль. Размер полотна: 2000×800 мм. Открывание: левое или правое.",
    price: 12800,
    image: "/media/products/1.jpg",
  },
  {
    id: 2,
    categoryId: 1,
    name: "Межкомнатная дверь «Витраж»",
    shortDescription: "Белая дверь с решёткой из матового стекла в верхней части.",
    fullDescription:
      "Стекло пропускает свет в коридор и закрывает обзор. Нижняя филёнка глухая, поэтому дверь выглядит собранно даже рядом с тёмной стеной.\n\nСтекло: матовое, 12 ячеек. Покрытие: эмаль. Размер: 2000×800 мм.",
    price: 14600,
    image: "/media/products/2.jpg",
  },
  {
    id: 3,
    categoryId: 1,
    name: "Межкомнатная дверь «Лазурь»",
    shortDescription: "Цветная эмаль и три вставки рифлёного стекла.",
    fullDescription:
      "Пыльный голубой оттенок хорошо стоит в сером интерьере. Рифлёное стекло рассеивает свет и скрывает то, что за дверью. Чёрная ручка идёт в комплекте.\n\nПокрытие: эмаль. Стекло: рифлёное. Размер: 2000×700 мм.",
    price: 16900,
    image: "/media/products/3.jpg",
  },
  {
    id: 4,
    categoryId: 1,
    name: "Межкомнатная дверь «Дуб»",
    shortDescription: "Глухое полотно под дуб со скрытой коробкой.",
    fullDescription:
      "Ровная плоскость без лишнего декора. Шпон дуба и скрытая коробка делают проём тихим акцентом, а не рамой на стене. Подходит к современному ремонту и к тёплому дереву на кухне.\n\nМатериал: шпон дуба. Коробка: скрытая. Размер: 2100×900 мм.",
    price: 18400,
    image: "/media/products/4.jpg",
  },
  {
    id: 5,
    categoryId: 1,
    name: "Межкомнатная дверь «Сканди»",
    shortDescription: "Светлое полотно с восемью стёклами.",
    fullDescription:
      "Классическая решётка, но без тёмной морени. Матовое стекло не режет глаз у окна. Модель берут в столовую и детскую, где нужен свет и спокойный рисунок.\n\nСтекло: матовое. Покрытие: эмаль. Размер: 2000×800 мм.",
    price: 15200,
    image: "/media/products/5.jpg",
  },
  {
    id: 6,
    categoryId: 2,
    name: "Входная дверь «Форт»",
    shortDescription: "Графитовая стальная дверь с глазком и двумя замками.",
    fullDescription:
      "Квартирная дверь с листом 1,5 мм, минеральной ватой и двумя контурами уплотнения. Внешняя сторона не боится влажной уборки площадки, внутренняя панель спокойного серого цвета.\n\nСталь: 1,5 мм. Замки: 2. Утеплитель: минеральная вата.",
    price: 24900,
    image: "/media/products/e1.jpg",
  },
  {
    id: 7,
    categoryId: 2,
    name: "Входная дверь «Орех»",
    shortDescription: "Тёплая накладка под орех и стальной каркас.",
    fullDescription:
      "Со стороны лестницы дверь выглядит деревянной, внутри — стальной короб. Накладка МДФ с покрытием под орех, уплотнитель по периметру, ночная задвижка.\n\nОтделка: МДФ. Толщина полотна: 70 мм. Замки: 2.",
    price: 28900,
    image: "/media/products/e2.jpg",
  },
  {
    id: 8,
    categoryId: 2,
    name: "Входная дверь «Бастион»",
    shortDescription: "Высокая чёрная дверь с вертикальным рифлением.",
    fullDescription:
      "Модель для частного дома: лист толще, броненакладки на замках, терморазрыв снижает промерзание. Рифление прячет мелкие царапины от ключей и сумок.\n\nСталь: 2 мм. Терморазрыв: да. Замки: 3.",
    price: 34900,
    image: "/media/products/e3.jpg",
  },
  {
    id: 9,
    categoryId: 2,
    name: "Входная дверь «Страж»",
    shortDescription: "Светлая утеплённая дверь с длинной ручкой.",
    fullDescription:
      "Светлый порошковый окрас не нагревается на солнце так, как чёрный. Два контура уплотнения и широкий порог с терморазрывом. Ставится в коттедж и в квартиру с тамбуром.\n\nОкрас: порошковый. Утеплитель: пенополистирол. Толщина: 80 мм.",
    price: 27500,
    image: "/media/products/e4.jpg",
  },
  {
    id: 10,
    categoryId: 2,
    name: "Входная дверь «Цитадель»",
    shortDescription: "Филёнчатая дверь глубокого зелёного цвета.",
    fullDescription:
      "Классические филёнки и латунная фурнитура для дома с кирпичным фасадом. Под отделкой — стальной лист, два замка и усиленные петли. Доводчик ставится по желанию.\n\nОтделка: МДФ, эмаль. Фурнитура: латунь. Замки: 2.",
    price: 42900,
    image: "/media/products/e5.jpg",
  },
  {
    id: 11,
    categoryId: 3,
    name: "Раздвижная дверь «Слайдер»",
    shortDescription: "Дубовое полотно на чёрной направляющей вдоль стены.",
    fullDescription:
      "Одна створка уезжает вдоль стены и не занимает место распахиванием. Ролики на подшипнике, ход тихий. Направляющая остаётся видимой — это часть рисунка, а не то, что прячут.\n\nСистема: купе. Направляющая: сталь. Размер: 2100×900 мм.",
    price: 15600,
    image: "/media/products/s1.jpg",
  },
  {
    id: 12,
    categoryId: 3,
    name: "Перегородка «Купе Лайт»",
    shortDescription: "Матовое стекло в алюминиевой раме между кухней и гостиной.",
    fullDescription:
      "Лёгкая перегородка закрывает запахи и оставляет свет. Ставится в готовый проём, без разбора стены. Нижний рельс можно утопить в пол на этапе ремонта.\n\nСтекло: матовое закалённое. Рама: алюминий. Высота: до 2400 мм.",
    price: 19800,
    image: "/media/products/s2.jpg",
  },
  {
    id: 13,
    categoryId: 3,
    name: "Раздвижная дверь «Пенал»",
    shortDescription: "Белое полотно уходит внутрь стены.",
    fullDescription:
      "Кассета монтируется до чистовой отделки. В открытом виде дверь не висит у стены и не мешает шкафу. Полотно глухое, эмаль в цвет наличника.\n\nСистема: пенал. Толщина стены: от 100 мм. Полотно: глухое.",
    price: 21400,
    image: "/media/products/s3.jpg",
  },
  {
    id: 14,
    categoryId: 3,
    name: "Портал «Горизонт»",
    shortDescription: "Две тёмные створки на всю стену между комнатами.",
    fullDescription:
      "Проём между кухней и гостиной закрывается двумя полотнами. Можно оставить проход посередине или сдвинуть обе створки в одну сторону. Шпон тёмного ореха, ролики скрыты в верхней шине.\n\nСтворок: 2. Материал: шпон ореха. Высота: 2400 мм.",
    price: 26800,
    image: "/media/products/s4.jpg",
  },
  {
    id: 15,
    categoryId: 3,
    name: "Раздвижная дверь «Сёдзи»",
    shortDescription: "Светлая рама и полупрозрачные панели.",
    fullDescription:
      "Тонкая рама из ясеня и рассеивающие панели. Дверь не темнит комнату и отделяет спальню от гардеробной. Ход по верхней направляющей, порога нет.\n\nМатериал: ясень. Панели: полупрозрачные. Тип: подвесная.",
    price: 18700,
    image: "/media/products/s5.jpg",
  },
];

const KEY = "doormarket-lab10";

type Extra = { categories: Category[]; items: CatalogItem[] };

const EMPTY: Extra = { categories: [], items: [] };

export function money(value: number) {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}

function readExtra(): Extra {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Extra;
    return {
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      items: Array.isArray(parsed.items) ? parsed.items : [],
    };
  } catch {
    return EMPTY;
  }
}

function writeExtra(extra: Extra) {
  localStorage.setItem(KEY, JSON.stringify(extra));
  window.dispatchEvent(new Event("dm-catalog"));
}

export function useCatalog() {
  const [extra, setExtra] = useState<Extra>(EMPTY);

  useLayoutEffect(() => {
    setExtra(readExtra());
    const onChange = () => setExtra(readExtra());
    window.addEventListener("dm-catalog", onChange);
    return () => window.removeEventListener("dm-catalog", onChange);
  }, []);

  return {
    categories: [...SEED_CATEGORIES, ...extra.categories],
    items: [...SEED_ITEMS, ...extra.items],
  };
}

export function addCategory(input: { name: string; description: string }) {
  const extra = readExtra();
  const ids = [...SEED_CATEGORIES, ...extra.categories].map((item) => item.id);
  const category: Category = {
    id: Math.max(0, ...ids) + 1,
    name: input.name.trim(),
    description: input.description.trim(),
  };
  extra.categories.push(category);
  writeExtra(extra);
  return category.id;
}

export function addItem(input: Omit<CatalogItem, "id">) {
  const extra = readExtra();
  const ids = [...SEED_ITEMS, ...extra.items].map((item) => item.id);
  const item: CatalogItem = { ...input, id: Math.max(0, ...ids) + 1 };
  extra.items.push(item);
  writeExtra(extra);
  return item.id;
}

export function fileToJpeg(file: File) {
  return new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const max = 960;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.78));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    image.src = url;
  });
}
