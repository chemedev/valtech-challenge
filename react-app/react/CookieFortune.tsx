import type React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useClient } from './client'
import ErrorBoundary from './utils/ErrorBoundary'

const CSS_HANDLES = ['button', 'container', 'number', 'phrase'] as const

type AppProps = React.PropsWithChildren

export function formatLuckyNumber(n: number) {
  const str = n.toString()
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4)}`
}

const Content = (_props: AppProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { getPhrase, getNumber, phrase, number, loadingNumber, loadingPhrase } =
    useClient()
  const loading = loadingNumber || loadingPhrase
  const randomPhrase = phrase?.getRandomPhrase.CookieFortune ?? ''
  const randomNumber = number?.getRandomNumber.number ?? null
  const formattedNumber = randomNumber ? formatLuckyNumber(randomNumber) : null

  const getLucky = async () => {
    try {
      await Promise.allSettled([getPhrase(), getNumber()])
    } catch (error) {
      console.log('CookieFortune: getPhraseHandler', error)
    }
  }

  return (
    <div className={handles.container}>
      {!loading && (
        <>
          <h5 className={handles.phrase}>{randomPhrase}</h5>
          <h3 className={handles.number}>{formattedNumber}</h3>
        </>
      )}
      <button
        className={handles.button}
        disabled={loading}
        onClick={getLucky}
        type="button"
      >
        {loading ? 'Loading...' : 'Click'}
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
