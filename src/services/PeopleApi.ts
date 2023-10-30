import { People } from "../models/People";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PeopleDetails, PeopleResponse, Response } from "./types";
import { PEOPLE_API_URL } from "./config";
import { formatIsoDate, getIdFromPeopleUrl } from "./helpers";

export const peopleApi = createApi({
  reducerPath: "peopleApi",
  baseQuery: fetchBaseQuery({ baseUrl: PEOPLE_API_URL }),
  endpoints: (builder) => ({
    getPeoples: builder.query<People[], void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        const firstPageResponse = await fetchWithBQ("");
        const firstPageData = firstPageResponse.data as Response;
        const promises = [];
        for (let i = 2; i <= Math.ceil(+firstPageData.count / 10); i++) {
          promises.push(fetchWithBQ(`?page=${i}`));
        }
        const pagesResponses = await Promise.all(promises);
        const peopleResponses: PeopleResponse[] = [];
        peopleResponses.push(
          ...firstPageData.results,
          ...pagesResponses.flatMap((page) => (page.data as Response).results),
        );
        return {
          data: peopleResponses.map((peopleResponse) => ({
            id: getIdFromPeopleUrl(peopleResponse.url) || "",
            name: peopleResponse.name,
            height: peopleResponse.height,
            mass: peopleResponse.mass,
            hairColor: peopleResponse.hair_color,
          })),
        };
      },
    }),
    getPeopleById: builder.query<PeopleDetails, string>({
      queryFn: async (id, _queryApi, _extraOptions, fetchWithBQ) => {
        const peopleResponse = await fetchWithBQ(`${id}`);
        const peopleData = peopleResponse.data as PeopleResponse;

        const fetchAndParse = async (url: string) => {
          const response = await fetch(url);
          return await response.json();
        };

        const [films, species, vehicles, starships] = await Promise.all([
          Promise.all(peopleData.films.map((url) => fetchAndParse(url))),
          Promise.all(peopleData.species.map((url) => fetchAndParse(url))),
          Promise.all(peopleData.vehicles.map((url) => fetchAndParse(url))),
          Promise.all(peopleData.starships.map((url) => fetchAndParse(url))),
        ]);

        return {
          data: {
            ...peopleData,
            created: formatIsoDate(peopleData.created),
            edited: formatIsoDate(peopleData.edited),
            films: films.map((film) => ({
              name: film.title,
              url: film.url,
            })),
            species: species.map((specie) => ({
              name: specie.name,
              url: specie.url,
            })),
            vehicles: vehicles.map((vehicle) => ({
              name: vehicle.name,
              url: vehicle.url,
            })),
            starships: starships.map((starship) => ({
              name: starship.name,
              url: starship.url,
            })),
          },
        };
      },
    }),
  }),
});
