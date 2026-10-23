import Image from "next/image";
import Link from "next/link";

export type CategoryCardProps = {
  href: string;
  name: string;
  image: { src: string; width: number; height: number };
  item: string;
  price: string;
  cta: string;
};

function CategoryCard({ href, name, image, item, price, cta }: CategoryCardProps) {
  return (
    <li>
      {/* One link per card; the image is decorative because the name is the link text. */}
      <Link
        href={href}
        className="group flex h-full flex-col bg-white ring-1 ring-ink/10 transition hover:ring-ink/30"
      >
        <div className="overflow-hidden">
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, 46vw"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-display text-[24px] leading-tight font-normal sm:text-[26px]">{name}</h3>
          <p className="mt-1 font-body text-[13px] leading-snug text-ink/75 sm:text-[14px]">
            {item}
            <span className="sr-only"> · </span>
            <span className="mt-0.5 block font-medium text-ink">{price}</span>
          </p>
          <span aria-hidden="true" className="mt-auto pt-3 font-body text-[13px] font-medium text-sage">
            {cta}
          </span>
        </div>
      </Link>
    </li>
  );
}

export function CategoryGrid({
  kicker,
  title,
  allHref,
  allLabel,
  categories,
  footnote,
}: {
  kicker: string;
  title: string;
  allHref: string;
  allLabel: string;
  categories: CategoryCardProps[];
  footnote?: string;
}) {
  return (
    <section id="categories" aria-labelledby="categories-title" className="px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.28em] text-sage">{kicker}</p>
            <h2 id="categories-title" className="mt-3 font-display text-[36px] leading-tight font-normal sm:text-[48px]">
              {title}
            </h2>
          </div>
          <Link
            href={allHref}
            className="inline-flex min-h-[44px] items-center font-body text-[14px] underline underline-offset-4 hover:text-sage"
          >
            {allLabel}
            <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </ul>
        {footnote ? <p className="mt-6 font-body text-[13px] text-ink/75">{footnote}</p> : null}
      </div>
    </section>
  );
}
