import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface PaginationProps {
  nextCursor?: string | null;
  currentCursor?: string | null;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}

export function Pagination({
  nextCursor,
  currentCursor,
  basePath,
  searchParams,
}: PaginationProps) {
  // Convert searchParams to URLSearchParams while removing pagination cursor
  const getUrl = (cursorValue?: string | null) => {
    const params = new URLSearchParams();

    // Copy all current searchParams
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== "cursor" && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else {
            params.append(key, value);
          }
        }
      });
    }

    if (cursorValue) {
      params.set("cursor", cursorValue);
    }

    const queryStr = params.toString();
    return `${basePath}${queryStr ? `?${queryStr}` : ""}`;
  };

  return (
    <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <div className="flex gap-2">
        {currentCursor ? (
          <Link
            href={getUrl(null)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            title="Voltar ao início"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Início</span>
          </Link>
        ) : null}
      </div>

      <div className="flex gap-3">
        {/* Next page button */}
        {nextCursor ? (
          <Link
            href={getUrl(nextCursor)}
            className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            <span>Próxima Página</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed">
            <span>Fim dos Resultados</span>
          </span>
        )}
      </div>
    </div>
  );
}
