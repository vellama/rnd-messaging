import { ConsumerConfig as NATSConsumerConfig } from '../_providers/nats/nats.types'
import { ConsumerConfig as NSQConsumerConfig } from '../_providers/nsq/nsq.types'
import { Consumer as NATSConsumer } from '../_providers/nats/nats.consumer'
import { Consumer as NSQConsumer } from '../_providers/nsq/nsq.consumer'

export type ConsumerConfig = NATSConsumerConfig | NSQConsumerConfig
export type Consumer = NATSConsumer | NSQConsumer

export interface Consumers {
  [topic: string]: NATSConsumer | NSQConsumer
}

export interface ConsumerImplementation {
  connect(): void
  disconnect(): void
  startConsuming(handler: Function): void
  onConnected(handler: Function): void
  onDisconnected(handler: Function): void
}
