import {
  ConsumerConfig,
  Consumers,
  Consumer as ConsumerType
} from './consumer.types'
import { Consumer as NATSConsumer } from '../_providers/nats/nats.consumer'
import { Consumer as NSQConsumer } from '../_providers/nsq/nsq.consumer'
import { Provider } from '../enums/providers.enums'

export class Consumer {
  private static consumers: Consumers
  private config: ConsumerConfig

  private constructor(consumerConfig: ConsumerConfig) {
    this.config = consumerConfig
  }

  public static getInstance(consumerConfig: ConsumerConfig): ConsumerType {
    if (!Consumer.hasInstance(consumerConfig)) {
      if (!Consumer.consumers) Consumer.consumers = {}

      Consumer.consumers[consumerConfig.topic] = this.initConsumer(
        consumerConfig
      )
    }
    return Consumer.consumers[consumerConfig.topic]
  }

  private static hasInstance(consumerConfig: ConsumerConfig) {
    if (!Consumer.consumers) return false
    return !!Consumer.consumers[consumerConfig.topic]
  }

  private static initConsumer(consumerConfig: ConsumerConfig): ConsumerType {
    let consumer: ConsumerType

    switch (consumerConfig.provider) {
      case Provider.NATS:
        consumer = Consumer.initNATSConsumer(consumerConfig)
        break
      case Provider.NSQ:
        consumer = Consumer.initNSQConsumer(consumerConfig)
        break
      default:
        throw new Error('provider not supported yet')
    }

    consumer.connect()
    consumer.onDisconnected(() => consumer.connect())

    return consumer
  }

  private static initNATSConsumer(config: ConsumerConfig): NATSConsumer {
    if (!config.channel) throw new Error('channel is not defined')

    return new NATSConsumer({
      provider: Provider.NATS,
      topic: config.topic,
      channel: config.channel,
      hosts: config.hosts
    })
  }

  private static initNSQConsumer(config: ConsumerConfig): NSQConsumer {
    if (!config.channel) throw new Error('channel is not defined')
    console.log('init NSQ consumer')

    return new NSQConsumer({
      provider: Provider.NSQ,
      topic: config.topic,
      channel: config.channel,
      hosts: config.hosts
    })
  }
}
