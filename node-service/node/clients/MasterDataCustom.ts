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

  public async getAllPhrases(appSettings: AppSettings): Promise<Phrase[]> {
    return this.http.get(
      '/api/dataentities/CF/search?_fields=id,CookieFortune',
      {
        headers: {
          'REST-Range': 'resources=0-100',
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
