import { ConsumerConfig as NSQConsumerConfig } from '../_providers/nsq/nsq.types'
import { Consumer as NSQConsumer } from '../_providers/nsq/nsq.consumer'

export type ConsumerConfig = NSQConsumerConfig
export type Consumer = NSQConsumer

export interface Consumers {
  [topic: string]: NSQConsumer
}

export interface ConsumerImplementation {
  connect(): void
  disconnect(): void
  startConsuming(handler: Function): void
  onConnected(handler: Function): void
  onDisconnected(handler: Function): void
}
