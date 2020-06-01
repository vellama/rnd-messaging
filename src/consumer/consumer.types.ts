import { ConsumerConfig as NSQConsumerConfig } from '../providers/nsq/nsq.types'
import { Consumer as NSQConsumer } from '../providers/nsq/nsq.consumer'

export type ConsumerConfig = NSQConsumerConfig
export type Consumer = NSQConsumer

export interface Consumers {
  [topic: string]: NSQConsumer
}

export interface ConsumerImplementation {
  isReady: boolean
  connect(): void
  disconnect(): void
  startConsuming(handler: Function): void
  onDisconnected(handler: Function): void
}
