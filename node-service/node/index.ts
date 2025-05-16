import {
  IOClients,
  Service,
  type ParamsContext,
  type RecorderState,
  type ServiceContext
} from '@vtex/api'

import { resolvers } from './resolvers'

declare global {
  type Context = ServiceContext<IOClients, RecorderState>
}

export default new Service<IOClients, RecorderState, ParamsContext>({
  clients: {
    implementation: IOClients,
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
