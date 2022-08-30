import { rest, setupWorker } from 'msw'
import { factory, oneOf, manyOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import seedrandom from 'seedrandom'
import { Server as MockSocketServer } from 'mock-socket'
import { setRandom } from 'txtgen'

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

/* MSW Data Model Setup */

export const db = factory({
  pokemon: {
    id: primaryKey(nanoid),
    name: String,
    order: String,
    types: manyOf('type'),
    species: oneOf('species')
  },
  types: {
    id: primaryKey(nanoid),
    name: String,
    url: String
  },
  species: {
    id: primaryKey(String),
    name: String,
    url: String
  },
})

/* MSW REST API Handlers */

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon', function (req, res, ctx) {
    const pokemons = db.pokemon.getAll()
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(pokemons))
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon/:pokemonId', function (req, res, ctx) {
    const pokemon = db.pokemon.findFirst({
      where: { id: { equals: req.params.postId } },
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(pokemon))
  }),
]

export const worker = setupWorker(...handlers)
worker.printHandlers() // Optional: nice for debugging to see all available route handlers that will be intercepted
