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
  dispatch(input: Message): Response
  onConnected(handler: Function): void
  onDisconnected(handler: Function): void
}

export interface Response {
  status: number
  body: any
}

export interface MessageHeader {
  token: string
}

export interface Message {
  header: MessageHeader
  body: any
}
