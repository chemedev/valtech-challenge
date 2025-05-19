import { ExternalClient } from '@vtex/api'
import type { IOContext, InstanceOptions } from '@vtex/api'

import type { AppSettings, Phrase } from '../typings/types'

export class MasterDataCustom extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://${ctx.account}.vtexcommercestable.com.br`, ctx, {
      ...options,
      timeout: 2000
    })
  }

  public async getTotal(appSettings: AppSettings): Promise<number> {
    const response = await this.http.getRaw(
      '/api/dataentities/CF/search?_fields=id,CookieFortune',
      {
        headers: {
          'REST-Range': 'resources=0-1',
          ...(appSettings?.appKey && {
            'X-VTEX-API-AppKey': appSettings.appKey
          }),
          ...(appSettings?.appToken && {
            'X-VTEX-API-AppToken': appSettings.appToken
          })
        }
      }
    )

    const total = Number(response.headers['rest-content-range'].split('/')[1])

    return total
  }

  public async getPhrase(
    appSettings: AppSettings,
    idx: number
  ): Promise<Phrase[]> {
    return this.http.get(
      `/api/dataentities/CF/search?_fields=id,CookieFortune&_=${Date.now()}`,
      {
        headers: {
          'REST-Range': `resources=${idx}-${idx + 1}`,
          ...(appSettings?.appKey && {
            'X-VTEX-API-AppKey': appSettings.appKey
          }),
          ...(appSettings?.appToken && {
            'X-VTEX-API-AppToken': appSettings.appToken
          })
        }
      }
    )
  }
}
