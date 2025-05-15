import type React from 'react'
import { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import './styles.css'
import ErrorBoundary from './utils/ErrorBoundary'
import { getPhrase, getNumber } from './service'
import type { Phrase } from './service'

const CSS_HANDLES = ['container'] as const

type AppProps = React.PropsWithChildren

enum Status {
  IDLE = 'idle',
  LOADING = 'loading'
}

export function formatLuckyNumber(n: number) {
  const str = n.toString()
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4)}`
}

const Content = (_props: AppProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [status, setStatus] = useState<Status>(Status.IDLE)
  const [phrase, setPhrase] = useState<Phrase['CookieFortune']>()
  const [number, setNumber] = useState<number>()

  const getLucky = async () => {
    try {
      setStatus(Status.LOADING)

      const [phraseRes, numberRes] = await Promise.allSettled([
        getPhrase(),
        getNumber()
      ])

      if (phraseRes.status === 'fulfilled' && phraseRes.value.data)
        setPhrase(phraseRes.value.data.CookieFortune)

      if (numberRes.status === 'fulfilled' && numberRes.value.data)
        setNumber(numberRes.value.data.number)
    } catch (error) {
      console.log('CookieFortune: getPhraseHandler', error)
    } finally {
      setStatus(Status.IDLE)
    }
  }

  return (
    <div className={handles.container}>
      {phrase && <h5>{phrase}</h5>}
      {number && <h3>{formatLuckyNumber(number)}</h3>}
      <button
        disabled={status === Status.LOADING}
        onClick={getLucky}
        type="button"
      >
        {status === Status.LOADING ? 'Loading...' : 'Click'}
      </button>
    </div>
  )
}

const CookieFortune = (props: React.PropsWithChildren) => (
  <ErrorBoundary
    fallback={
      <p style={{ color: 'darkred', fontStyle: 'italic' }}>
        [CookieFortune] error
      </p>
    }
  >
    <Content {...props} />
  </ErrorBoundary>
)

export default CookieFortune
