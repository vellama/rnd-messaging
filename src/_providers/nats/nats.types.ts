import { Provider } from '../../enums/providers.enums'
import {
  ConnectionOptions,
  HostConfig
} from '../../shared/types/connection.types'

export interface AuthConfig {
  username?: string
  password?: string
  token?: string
}

export interface ConsumerConfig {
  provider: Provider.NATS
  hosts: HostConfig[]
  topic: string
  channel: string
  authConfig?: AuthConfig
  options?: ConnectionOptions
}
