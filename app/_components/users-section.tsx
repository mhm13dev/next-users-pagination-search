import React from "react";
import { getUsers } from "@/lib/fetchers/get-users";
import type { SearchParams } from "../page";
import { PaginationSection } from "./pagination-section";

interface Props {
  searchParams: SearchParams;
}

export const UsersSection: React.FC<Props> = async ({ searchParams }) => {
  const { users, hasMore, timeTaken } = await getUsers({
    page: searchParams.page,
    size: searchParams.size,
    search: searchParams.search,
  });

  return (
    <>
      <section className="my-8">
        <p className="text-gray-500 text-sm mb-2 text-right">
          Time taken: {timeTaken}ms
        </p>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-background text-foreground rounded-lg shadow"
            >
              <p className="font-medium text-gray-800">
                {user.id}. {user.first_name} {user.last_name}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">{user.email}</p>
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </section>

      <PaginationSection searchParams={searchParams} hasMore={hasMore} />
    </>
  );
};
