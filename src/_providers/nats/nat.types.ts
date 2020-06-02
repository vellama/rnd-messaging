import { Provider } from '../../enums/providers.enums'
import { HostConfig } from '../../types/connection.types'

export interface AuthConfig {
  username?: string
  password?: string
  token?: string
}

export interface ConsumerConfig {
  provider: Provider.NATS
  hosts: HostConfig[]
  user: string
  password: string
}
