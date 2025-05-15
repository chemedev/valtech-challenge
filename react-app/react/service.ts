import dataJSON from './data.json'

export interface Phrase {
  CookieFortune: string
  id: string
}

export type Response<T> = { data: T } | { data: null; error: string }

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function getPhrase(): Promise<Response<Phrase>> {
  try {
    await delay(2000)
    const data: Phrase = dataJSON[Math.floor(Math.random() * dataJSON.length)]
    return { data }
  } catch (error) {
    console.log('[CookieFortune: getPhrase] Error while fetching.')
    return { error: 'Error while fetching', data: null }
  }
}

export async function getNumber(): Promise<Response<{ number: number }>> {
  try {
    await delay(1800)
    const data = { number: Math.floor(Math.random() * 9e7) + 1e7 }
    return { data }
  } catch (error) {
    console.log('[CookieFortune: getLuckyNumber] Error while fetching.')
    return { error: 'Error while fetching', data: null }
  }
}
