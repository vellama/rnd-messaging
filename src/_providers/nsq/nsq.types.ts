import { Provider } from '../../enums/providers.enums'
import { HostConfig } from '../../types/connection.types'

export interface AuthenticationConfig {
  secret: string
}

export interface ConsumerConfig {
  provider: Provider.NSQ
  hosts: HostConfig[]
  topic: string
  channel: string
  authConfig?: AuthenticationConfig
}

export interface EmiterConfig {
  provider: Provider.NSQ
  host: HostConfig
  topic: string
  authConfig?: AuthenticationConfig
}
