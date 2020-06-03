import { ConsumerConfig as NATSConsumerConfig } from '../../_providers/nats/nats.types'
import { ConsumerConfig as NSQConsumerConfig } from '../../_providers/nsq/nsq.types'

export type Consumer = NATSConsumerConfig | NSQConsumerConfig
