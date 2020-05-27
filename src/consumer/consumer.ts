import {
  ConsumerConfig,
  Consumers,
  Consumer as ConsumerType
} from './consumer.types'
import { Consumer as SQSConsumer } from '../_providers/sqs/sqs.consumer'
import { Provider } from '../_providers/enums/providers.enums'

export class Consumer {
  private static consumers: Consumers
  private config: ConsumerConfig

  private constructor(consumerConfig: ConsumerConfig) {
    this.config = consumerConfig
  }

  public static getInstance(consumerConfig: ConsumerConfig): ConsumerType {
    if (!Consumer.hasInstance(consumerConfig)) {
      Consumer.consumers[consumerConfig.topic] = this.initConsumer(
        consumerConfig
      )
    }
    return Consumer.consumers[consumerConfig.topic]
  }

  private static hasInstance(consumerConfig: ConsumerConfig) {
    return !!Consumer.consumers[consumerConfig.topic]
  }

  private static initConsumer(consumerConfig: ConsumerConfig): ConsumerType {
    let consumer: ConsumerType

    switch (consumerConfig.provider) {
      case Provider.SQS:
        consumer = Consumer.initSQSConsumer(consumerConfig)
        break
      default:
        throw new Error('provider not supported yet')
    }

    this.connect(consumer)
    consumer.onDisconnected(() => this.connect(consumer))

    return consumer
  }

  private static initSQSConsumer(config: ConsumerConfig): SQSConsumer {
    if (!config.channel) throw new Error('channel is not defined')

    return new SQSConsumer({
      provider: Provider.SQS,
      topic: config.topic,
      channel: config.channel,
      hosts: config.hosts,
      lookupHosts: config.lookupHosts
    })
  }

  private static connect(consumer: ConsumerType) {
    while (!consumer.isReady) {
      consumer.connect()
    }
  }
}
