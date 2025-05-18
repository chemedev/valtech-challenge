import {
  Service,
  type ParamsContext,
  type RecorderState,
  type ServiceContext
} from '@vtex/api'

import { Clients } from './clients'
import { resolvers } from './resolvers'

declare global {
  type Context = ServiceContext<Clients, RecorderState>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        exponentialTimeoutCoefficient: 2,
        retries: 3,
        timeout: 5000
      }
    }
  },
  graphql: { resolvers }
})
