import { useMutation, useQuery } from 'react-apollo'
import ADD_PHRASE from './graphql/addPhrase.gql'
import DELETE_PHRASE from './graphql/deletePhrase.gql'
import GET_ALL_PHRASES from './graphql/getAllPhrases.gql'

export type Phrase = {
  id: string
  CookieFortune: string
}

type GetAllPhrasesResult = {
  getAllPhrases: Phrase[]
}

type AddPhraseResult = {
  addPhrase: Phrase
}

type DeletePhraseResult = {
  deletePhrase: { id: string }
}

export const usePhraseClient = () => {
  const {
    data: phrasesData,
    loading: loadingPhrases,
    refetch: refreshPhrases
  } = useQuery<GetAllPhrasesResult>(GET_ALL_PHRASES, {
    fetchPolicy: 'cache-and-network'
  })

  const [postPhrase] = useMutation<AddPhraseResult, { phrase: string }>(
    ADD_PHRASE,
    {
      optimisticResponse: ({ phrase }) => ({
        addPhrase: {
          __typename: 'CookieFortune',
          CookieFortune: phrase,
          id: `${Date.now()}`
        }
      }),
      update: (cache, { data }) => {
        const newPhrase = data?.addPhrase
        if (!newPhrase) return

        const existing = cache.readQuery<{ getAllPhrases: Phrase[] }>({
          query: GET_ALL_PHRASES
        })

        if (!existing) return

        cache.writeQuery({
          query: GET_ALL_PHRASES,
          data: { getAllPhrases: [...existing.getAllPhrases, newPhrase] }
        })
      }
    }
  )

  const [deletePhrase] = useMutation<DeletePhraseResult, { id: string }>(
    DELETE_PHRASE,
    {
      optimisticResponse: ({ id }) => ({
        deletePhrase: {
          __typename: 'DeleteResponse',
          id
        }
      }),
      update: (cache, { data }) => {
        if (!data.deletePhrase?.id) return

        const existing = cache.readQuery<{ getAllPhrases: Phrase[] }>({
          query: GET_ALL_PHRASES
        })

        if (!existing) return

        const updated = existing.getAllPhrases.filter(
          (p) => p.id !== data.deletePhrase.id
        )

        cache.writeQuery({
          query: GET_ALL_PHRASES,
          data: { getAllPhrases: updated }
        })
      }
    }
  )

  return {
    phrases: phrasesData,
    loadingPhrases,
    refreshPhrases,
    postPhrase,
    deletePhrase
  }
}
