import { ConsumerConfig as SQSConsumerConfig } from '../_providers/sqs/sqs.types'
import { Consumer as SQSConsumer } from '../_providers/sqs/sqs.consumer'

export type ConsumerConfig = SQSConsumerConfig

export interface Consumers {
  [topic: string]: SQSConsumer
}

export interface ConsumerImplementation {
  isReady: boolean
  connect(): void
  disconnect(): void
  startConsuming(handler: Function): void
  onDisconnected(handler: Function): void
}

export type Consumer = SQSConsumer
