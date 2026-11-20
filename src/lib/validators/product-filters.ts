import { z } from "zod";
import { PRICE_RANGE_KEYS, PRODUCT_AUDIENCES, PRODUCT_FORMATS, PRODUCT_SORTS } from "@/lib/product-options";

// Any wrong value in the web address is quietly ignored (catch), so the page never breaks.
const productFiltersSchema = z.object({
  q: z.string().trim().max(60).optional().catch(undefined),
  category: z.string().trim().max(60).optional().catch(undefined),
  format: z.enum(PRODUCT_FORMATS).optional().catch(undefined),
  audience: z.enum(PRODUCT_AUDIENCES).optional().catch(undefined),
  price: z.enum(PRICE_RANGE_KEYS).optional().catch(undefined),
  sort: z.enum(PRODUCT_SORTS).catch("recommended"),
});

export type ProductFilters = z.infer<typeof productFiltersSchema>;

type RawSearchParams = Record<string, string | string[] | undefined>;

export function parseProductFilters(searchParams: RawSearchParams): ProductFilters {
  const firstValues = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
  return productFiltersSchema.parse(firstValues);
}
