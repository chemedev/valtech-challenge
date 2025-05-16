const ENTITY = 'CF'
const MAX_SIZE = 100

// TODO: allow pagination param for more queries
export const queries = {
  getAllPhrases: async (_: unknown, __: unknown, ctx: Context) => {
    return ctx.clients.masterdata.searchDocuments({
      dataEntity: ENTITY,
      fields: ['id', 'CookieFortune'],
      pagination: { page: 1, pageSize: MAX_SIZE }
    })
  },

  //? Not using getAllPhrases and filtering cause might be more than MAX_SIZE records.
  getRandomPhrase: async (_: unknown, _args: unknown, ctx: Context) => {
    const {
      pagination: { total }
    } = await ctx.clients.masterdata.searchDocumentsWithPaginationInfo({
      dataEntity: ENTITY,
      fields: [],
      pagination: { page: 1, pageSize: 1 }
    })

    const randomPage = Math.floor(Math.random() * total) + 1

    const { data } =
      await ctx.clients.masterdata.searchDocumentsWithPaginationInfo({
        dataEntity: ENTITY,
        fields: ['id', 'CookieFortune'],
        pagination: { page: randomPage, pageSize: 1 }
      })

    return data[0]
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
      dataEntity: ENTITY,
      fields: { CookieFortune }
    })

    return { id: DocumentId, CookieFortune }
  },

  deletePhrase: async (_: unknown, args: { id: string }, ctx: Context) => {
    await ctx.clients.masterdata.deleteDocument({
      dataEntity: ENTITY,
      id: args.id
    })
    return true
  }
}
