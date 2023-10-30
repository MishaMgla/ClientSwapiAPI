import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PeopleResponse, Response, SearchResult } from "./types";
import { PEOPLE_API_URL } from "./config";
import { getIdFromPeopleUrl } from "./helpers";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: PEOPLE_API_URL }),
  endpoints: (builder) => ({
    search: builder.query<SearchResult[], string>({
      queryFn: async (searchQuery, _queryApi, _extraOptions, fetchWithBQ) => {
        if (!searchQuery) {
          return { data: [] };
        }
        const firstPageResponse = await fetchWithBQ(`?search=${searchQuery}`);
        const firstPageData = firstPageResponse.data as Response;
        if (firstPageData.count === "0") {
          return { data: [] };
        }
        const promises = [];
        for (let i = 2; i <= Math.ceil(+firstPageData.count / 10); i++) {
          promises.push(fetchWithBQ(`?search=${searchQuery}&page=${i}`));
        }
        const pagesResponses = await Promise.all(promises);
        const searchResults: PeopleResponse[] = [];
        searchResults.push(
          ...firstPageData.results,
          ...pagesResponses.flatMap((page) => (page.data as Response).results),
        );
        return {
          data: searchResults.map((people) => ({
            name: people.name,
            id: getIdFromPeopleUrl(people.url) || "",
          })),
        };
      },
    }),
  }),
});
