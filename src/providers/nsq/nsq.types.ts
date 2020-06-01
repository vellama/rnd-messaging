import { Provider } from '../enums/providers.enums'

export interface HostConfig {
  host: string
  port: number
}

export interface AuthConfig {
  secret: string
}

export interface ConsumerConfig {
  provider: Provider.NSQ
  hosts: HostConfig[]
  topic: string
  channel: string
  authConfig?: AuthConfig
}

export interface EmiterConfig {
  provider: Provider.NSQ
  host: HostConfig
  topic: string
  authConfig?: AuthConfig
}
