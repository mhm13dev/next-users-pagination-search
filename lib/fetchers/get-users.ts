import "server-only";
import { users } from "../data/users";
import type { User } from "../types/user";

type GetUsersParams = Readonly<{
  page?: number;
  size?: number;
  search?: string;
}>;

export interface GetUsersResponse {
  users: User[];
  hasMore: boolean;
  timeTaken: number;
}

export const getUsers = (params: GetUsersParams): Promise<GetUsersResponse> => {
  const { page = 1, size = 10, search } = params;

  if (size < 1) {
    throw new Error("Size should be greater than 0");
  }

  if (page < 1) {
    throw new Error("Page should be greater than 0");
  }

  if (size > 100) {
    throw new Error("Size should be less than 100");
  }

  const start = (page - 1) * size;
  const end = start + size + 1;

  const filteredUsers = users.filter((user) => {
    if (!search) {
      return true;
    }

    return (
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const usersResults = filteredUsers.slice(start, end);

  return new Promise((resolve) => {
    const startTime = Date.now();
    setTimeout(
      () => {
        resolve({
          users: usersResults.slice(0, size),
          hasMore: usersResults.length > size,
          timeTaken: Date.now() - startTime,
        });
      },
      // Synthetic Delay
      Math.floor(Math.random() * 1000)
    );
  });
};
