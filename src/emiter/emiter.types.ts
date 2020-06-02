import { EmiterConfig as NSQEmiterConfig } from '../_providers/nsq/nsq.types'
import { Emiter as NSQEmiter } from '../_providers/nsq/nsq.emiter'

export type EmiterConfig = NSQEmiterConfig
export type Emiter = NSQEmiter

export interface Emiters {
  [topic: string]: NSQEmiter
}

export interface EmiterImplementation {
  connect(): void
  disconnect(): void
  dispatch<T>(input: T): DispatchResponse
  onConnected(handler: Function): void
  onDisconnected(handler: Function): void
}

export interface DispatchResponse {
  status: number
  body: any
}
