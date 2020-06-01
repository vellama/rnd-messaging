import {
  ConsumerConfig,
  Consumers,
  Consumer as ConsumerType
} from './consumer.types'
import { Consumer as NSQConsumer } from '../providers/nsq/nsq.consumer'
import { Provider } from '../providers/enums/providers.enums'

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
      case Provider.NSQ:
        consumer = Consumer.initNSQConsumer(consumerConfig)
        break
      default:
        throw new Error('provider not supported yet')
    }

    this.connect(consumer)
    consumer.onDisconnected(() => this.connect(consumer))

    return consumer
  }

  private static initNSQConsumer(config: ConsumerConfig): NSQConsumer {
    if (!config.channel) throw new Error('channel is not defined')

    return new NSQConsumer({
      provider: Provider.NSQ,
      topic: config.topic,
      channel: config.channel,
      hosts: config.hosts
    })
  }

  private static connect(consumer: ConsumerType) {
    if (!consumer.isReady) {
      consumer.connect()

      setTimeout(() => {
        this.connect(consumer)
      }, 1000)
    }
  }
}
