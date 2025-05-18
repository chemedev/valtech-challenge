import { useLazyQuery } from 'react-apollo'
import getRandomPhrase from './graphql/getRandomPhrase.gql'
import getRandomNumber from './graphql/getRandomNumber.gql'

type GetRandomPhraseResult = {
  getRandomPhrase: {
    id: string
    CookieFortune: string
  }
}

type GetRandomNumberResult = {
  getRandomNumber: {
    number: number
  }
}

export const useClient = () => {
  const [getPhrase, { data: phraseData, loading: loadingPhrase }] =
    useLazyQuery<GetRandomPhraseResult>(getRandomPhrase, {
      fetchPolicy: 'no-cache'
    })

  const [getNumber, { data: numberData, loading: loadingNumber }] =
    useLazyQuery<GetRandomNumberResult>(getRandomNumber, {
      fetchPolicy: 'no-cache'
    })

  return {
    getPhrase,
    phrase: phraseData,
    loadingPhrase,
    getNumber,
    number: numberData,
    loadingNumber
  }
}
