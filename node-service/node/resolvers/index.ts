import { queries as PhrasesQueries, mutations } from './Phrases'
import { queries as NumberQueries } from './Number'

export const resolvers = {
  Query: { ...PhrasesQueries, ...NumberQueries },
  Mutation: { ...mutations }
}
