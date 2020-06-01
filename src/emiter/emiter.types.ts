import { EmiterConfig as NSQEmiterConfig } from '../providers/nsq/nsq.types'
import { Emiter as NSQEmiter } from '../providers/nsq/nsq.emiter'

export type EmiterConfig = NSQEmiterConfig
export type Emiter = NSQEmiter

export interface Emiters {
  [topic: string]: NSQEmiter
}

export interface EmiterImplementation {
  isReady: boolean
  connect(): void
  disconnect(): void
  dispatch<T>(input: T): DispatchResponse
  onDisconnected(handler: Function): void
}

export interface DispatchResponse {
  status: number
  body: any
}
