import { Suspense } from "react";
import { CgSpinner } from "react-icons/cg";
import { SearchUsers } from "./_components/search-users";
import { UsersSection } from "./_components/users-section";
import { FooterSection } from "./_components/footer-section";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Home(props: Props) {
  const searchParams = await prepareSearchParams(props.searchParams);

  return (
    <div className="max-w-screen-md mx-auto">
      <section className="my-8">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
      </section>

      <SearchUsers />

      <Suspense
        fallback={<CgSpinner className="animate-spin size-6 mx-auto" />}
        key={!!searchParams.search?.length ? searchParams.search : undefined}
      >
        <UsersSection searchParams={searchParams} />
      </Suspense>

      <FooterSection />
    </div>
  );
}

/**
 * `SearchParams` for Home Page
 */
export interface SearchParams {
  page: number;
  size: number;
  search?: string;
  [key: string]: string | string[] | number | undefined;
}

/**
 * Prepare search params for the Home Page
 */
const prepareSearchParams = async (searchParams: Promise<SearchParams>) => {
  const { page, size, ...rest } = await searchParams;

  return {
    ...rest,
    page: !isNaN(Number(page)) ? Number(page) : 1,
    size: !isNaN(Number(size)) ? Number(size) : 10,
  };
};
