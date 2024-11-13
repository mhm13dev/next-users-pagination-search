import React from "react";
import Link from "next/link";
import queryString from "query-string";
import type { SearchParams } from "../page";

interface Props {
  searchParams: SearchParams;
  hasMore: boolean;
}

export const PaginationSection: React.FC<Props> = ({
  searchParams,
  hasMore,
}) => {
  const nextQueryStr = queryString.stringify({
    ...searchParams,
    page: searchParams.page + 1,
  });

  const prevQueryStr = queryString.stringify({
    ...searchParams,
    page: searchParams.page - 1,
  });

  return (
    <section className="my-8 flex justify-end">
      <div className="space-x-2">
        {searchParams.page > 1 && (
          <Link
            href={`/?${prevQueryStr}`}
            className="px-4 py-2 bg-black text-white rounded-lg shadow inline-block"
          >
            Previous
          </Link>
        )}

        {hasMore && (
          <Link
            href={`/?${nextQueryStr}`}
            className="px-4 py-2 bg-black text-white rounded-lg shadow inline-block"
          >
            Next
          </Link>
        )}
      </div>
    </section>
  );
};
