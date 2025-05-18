import type React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

import { useClient } from './client'
import ErrorBoundary from './utils/ErrorBoundary'

const CSS_HANDLES = [
  'container',
  'content_container',
  'button',
  'dice',
  'number',
  'number_container',
  'phrase',
  'phrase_container'
] as const

type AppProps = React.PropsWithChildren

export function formatLuckyNumber(n: number) {
  const str = n.toString()
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4)}`
}

const Content = (_props: AppProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { getPhrase, getNumber, phrase, number, loadingNumber, loadingPhrase } =
    useClient()
  const randomPhrase = phrase?.getRandomPhrase.CookieFortune ?? ''
  const randomNumber = number?.getRandomNumber.number ?? null
  const formattedNumber = randomNumber ? formatLuckyNumber(randomNumber) : null
  const loading = loadingNumber || loadingPhrase

  const getLucky = async () => {
    try {
      await Promise.allSettled([getPhrase(), getNumber()])
    } catch (error) {
      console.log('CookieFortune: getPhraseHandler', error)
    }
  }

  return (
    <div className={handles.container}>
      <button
        className={applyModifiers(handles.button, loading ? 'loading' : '')}
        disabled={loading}
        onClick={getLucky}
        type="button"
      />

      {randomNumber && randomPhrase && (
        <div className={handles.content_container}>
          <div className={handles.phrase_container}>
            <h3 className={handles.phrase}>«{randomPhrase}»</h3>
          </div>
          <div className={handles.dice}>🎲</div>
          <div className={handles.number_container}>
            <h5 className={handles.number}>{formattedNumber}</h5>
          </div>
        </div>
      )}
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
