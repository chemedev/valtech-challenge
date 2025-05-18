import { IOClients } from '@vtex/api'
import { MasterDataCustom } from './MasterDataCustom'

export class Clients extends IOClients {
  public get customMasterdata() {
    return this.getOrSet('masterDataCustom', MasterDataCustom)
  }
}
