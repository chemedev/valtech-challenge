import type { Phrase } from '../typings/types'
import * as CONSTANTS from '../utils/constants'

export const queries = {
  getAllPhrases: async (_: unknown, __: unknown, ctx: Context) => {
    return ctx.clients.masterdata.searchDocuments<Phrase>({
      dataEntity: CONSTANTS.MD_ENTITY,
      fields: ['id', 'CookieFortune'],
      pagination: { page: 1, pageSize: CONSTANTS.PAGE_MAX_SIZE }
    })
  },

  getRandomPhrase: async (_: unknown, _args: unknown, ctx: Context) => {
    const appId = process.env.VTEX_APP_ID ?? ''
    const settings = await ctx.clients.apps.getAppSettings(appId)
    const total = await ctx.clients.customMasterdata.getTotal(settings)
    const rnd = Math.floor(Math.random() * total)
    const [phrase] = await ctx.clients.customMasterdata.getPhrase(settings, rnd)
    return phrase
  }
}

export const mutations = {
  addPhrase: async (
    _: unknown,
    args: { data: { CookieFortune: string } },
    ctx: Context
  ) => {
    const { CookieFortune } = args.data

    const { DocumentId } = await ctx.clients.masterdata.createDocument({
      dataEntity: CONSTANTS.MD_ENTITY,
      fields: { CookieFortune }
    })

    return { id: DocumentId, CookieFortune }
  },

  deletePhrase: async (_: unknown, args: { id: string }, ctx: Context) => {
    await ctx.clients.masterdata.deleteDocument({
      dataEntity: CONSTANTS.MD_ENTITY,
      id: args.id
    })
    return { id: args.id }
  }
}
