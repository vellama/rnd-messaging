import { Reader } from 'nsqjs'
import { Provider } from '../enums/providers.enums'

interface HostConfig {
  host: string
  port?: number
}

interface AuthConfig {
  secret: string
}

export interface ConsumerConfig {
  provider: Provider.SQS
  hosts: HostConfig[]
  lookupHosts: HostConfig[]
  topic: string
  channel: string
  authConfig?: AuthConfig
}
