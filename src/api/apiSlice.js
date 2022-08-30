import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2'}),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: (params) => (params ? `/pokemon?${params}` : '/pokemon'),
    }),
    getPokemon: builder.query({
      query: (pokemonName) => `/pokemon/${pokemonName}`,
    }),
    getSpecies: builder.query({
      query: (pokemonName) => `/pokemon-species/${pokemonName}`,
    }),
    getEvolutions: builder.query({
      query: (pokemonId) => `/evolution-chain/${pokemonId}`,
    })
  })
})

export const {
  useGetPokemonsQuery,
  useGetPokemonQuery,
  useGetSpeciesQuery,
  useGetEvolutionsQuery
} = apiSlice;
