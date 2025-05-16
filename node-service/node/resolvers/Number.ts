export const queries = {
  getRandomNumber: async (_: unknown, __: unknown, _ctx: Context) => {
    return {
      number: Math.floor(Math.random() * 9e7) + 1e7
    }
  }
}
