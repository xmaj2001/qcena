"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchField } from "@heroui/react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams?.get("q") ?? "");
  return (
    <Form
      action="/search"
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <SearchField
        name="q"
        aria-label="Pesquisar serviços"
        key={searchParams?.get("q")}
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            className="w-[280px]"
            placeholder="Pesquisar serviços..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
