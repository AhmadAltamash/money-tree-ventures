import { PriceTag } from "@/components/products/PriceTag";
import { ProductCover, formatIcons } from "@/components/products/ProductCover";
import { formatPrice } from "@/lib/format";
import { getFeaturedProducts } from "@/services/product.service";

// A small preview of real kits, taken from the database. It is not clickable on purpose,
// so the only action in the hero is the main button.
export async function HeroKitStack() {
  const featured = await getFeaturedProducts(4);

  if (featured.length === 0) {
    return null;
  }

  const spotlight = featured.find((product) => product.format === "bundle") ?? featured[0];
  const otherKits = featured.filter((product) => product.id !== spotlight.id).slice(0, 3);

  return (
    <aside aria-label="Kuch featured kits" className="rounded-2xl border border-border bg-surface p-2">
      <ProductCover format={spotlight.format} leafNumber={spotlight.leafNumber} />
      <div className="flex items-start justify-between gap-4 p-3">
        <div>
          <p className="caption-1 text-muted">Featured kit</p>
          <p className="title-2">{spotlight.title}</p>
        </div>
        <PriceTag price={spotlight.price} originalPrice={spotlight.originalPrice} />
      </div>
      <ul className="flex flex-col">
        {otherKits.map((kit) => {
          const FormatIcon = formatIcons[kit.format];
          return (
            <li key={kit.id} className="flex items-center gap-3 rounded-lg p-3">
              <FormatIcon aria-hidden="true" size={24} className="shrink-0 text-brand" />
              <span className="title-4 flex-1">{kit.title}</span>
              <span className="body-4">{formatPrice(kit.price)}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
