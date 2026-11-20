"use client";

import { useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FunnelSimple, MagnifyingGlass, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import {
  PRICE_RANGE_KEYS,
  PRODUCT_AUDIENCES,
  PRODUCT_FORMATS,
  PRODUCT_SORTS,
  audienceLabels,
  formatLabels,
  priceRanges,
  sortLabels,
} from "@/lib/product-options";
import { joinClasses } from "@/lib/utils";
import type { ProductFilters as ProductFilterValues } from "@/lib/validators/product-filters";
import type { Category } from "@/types/product";

const controlStyles =
  "min-h-11 w-full rounded-lg border border-border bg-surface px-3 body-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  emptyLabel?: string;
  onChange: (value: string) => void;
};

function FilterSelect({ id, label, value, options, emptyLabel, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="caption-1 text-muted">
        {label}
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={controlStyles}>
        {emptyLabel ? <option value="">{emptyLabel}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type ProductFiltersProps = {
  categories: Category[];
  values: ProductFilterValues;
  resultCount: number;
};

export function ProductFilters({ categories, values, resultCount }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchText, setSearchText] = useState(values.q ?? "");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const searchTimer = useRef<number | undefined>(undefined);

  const hasActiveFilters = Boolean(
    values.q || values.category || values.format || values.audience || values.price || values.sort !== "recommended",
  );

  // Every filter lives in the web address, so a filtered page can be shared or bookmarked.
  function updateParams(changes: Record<string, string>) {
    const params = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(changes)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  }

  // Waits until the visitor pauses typing, so we do not search on every key press.
  function handleSearchChange(text: string) {
    setSearchText(text);
    window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => updateParams({ q: text.trim() }), 350);
  }

  function handleClear() {
    window.clearTimeout(searchTimer.current);
    setSearchText("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  const resultText = isPending
    ? "Dhoondh rahe hain..."
    : resultCount > 0
      ? `${resultCount} kit mile`
      : "Koi kit nahi mila";

  return (
    <form role="search" onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <label htmlFor="product-search" className="sr-only">
            Kits mein search karein
          </label>
          <MagnifyingGlass
            aria-hidden="true"
            size={20}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          />
          <input
            id="product-search"
            type="search"
            value={searchText}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Kit ya keyword dhoondhein, jaise Canva"
            autoComplete="off"
            className={joinClasses(controlStyles, "pl-10")}
          />
        </div>
        <Button
          variant="secondary"
          className="md:hidden"
          aria-expanded={isPanelOpen}
          aria-controls="product-filter-panel"
          onClick={() => setIsPanelOpen((isOpen) => !isOpen)}
        >
          <FunnelSimple aria-hidden="true" size={20} />
          Filters
        </Button>
      </div>

      <div
        id="product-filter-panel"
        className={joinClasses(
          "gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
          isPanelOpen ? "grid" : "hidden md:grid",
        )}
      >
        <FilterSelect
          id="filter-category"
          label="Category"
          value={values.category ?? ""}
          emptyLabel="Sabhi"
          options={categories.map((category) => ({ value: category.slug, label: category.name }))}
          onChange={(value) => updateParams({ category: value })}
        />
        <FilterSelect
          id="filter-format"
          label="Type"
          value={values.format ?? ""}
          emptyLabel="Sabhi"
          options={PRODUCT_FORMATS.map((format) => ({ value: format, label: formatLabels[format] }))}
          onChange={(value) => updateParams({ format: value })}
        />
        <FilterSelect
          id="filter-audience"
          label="Kiske liye"
          value={values.audience ?? ""}
          emptyLabel="Sabhi"
          options={PRODUCT_AUDIENCES.map((audience) => ({ value: audience, label: audienceLabels[audience] }))}
          onChange={(value) => updateParams({ audience: value })}
        />
        <FilterSelect
          id="filter-price"
          label="Price"
          value={values.price ?? ""}
          emptyLabel="Kuch bhi"
          options={PRICE_RANGE_KEYS.map((key) => ({ value: key, label: priceRanges[key].label }))}
          onChange={(value) => updateParams({ price: value })}
        />
        <FilterSelect
          id="filter-sort"
          label="Sort"
          value={values.sort}
          options={PRODUCT_SORTS.map((sort) => ({ value: sort, label: sortLabels[sort] }))}
          onChange={(value) => updateParams({ sort: value === "recommended" ? "" : value })}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="caption-1 text-muted">
          {resultText}
        </p>
        {hasActiveFilters ? (
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <X aria-hidden="true" size={16} />
            Filters hatayein
          </Button>
        ) : null}
      </div>
    </form>
  );
}
