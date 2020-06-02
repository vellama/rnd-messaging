import {
  ConsumerConfig,
  Consumer as ConsumerType,
  ConsumerImplementation
} from './consumer.types'
import { Consumer as NSQConsumer } from '../_providers/nsq/nsq.consumer'
import { Provider } from '../enums/providers.enums'

export class Consumer implements ConsumerImplementation {
  private config: ConsumerConfig
  public consumer: ConsumerType

  public constructor (consumerConfig: ConsumerConfig) {
    this.config = consumerConfig
    this.consumer = this.initConsumer(this.config)
  }

  public connect () {
    this.consumer.connect()
  }

  public disconnect () {
    this.consumer.disconnect()
  }

  public onConnected (handler: Function) {
    this.consumer.onConnected(handler)
  }

  public onDisconnected (handler: Function) {
    this.consumer.onDisconnected(handler)
  }

  public startConsuming (handler: Function) {
    this.consumer.startConsuming(handler)
  }

  private initConsumer (consumerConfig: ConsumerConfig): ConsumerType {
    let consumer: ConsumerType

    switch (consumerConfig.provider) {
      case Provider.NSQ:
        consumer = this.initNSQConsumer(consumerConfig)
        break
      default:
        throw new Error('provider not supported yet')
    }

    return consumer
  }

  private initNSQConsumer (config: ConsumerConfig): NSQConsumer {
    if (!config.channel) throw new Error('channel is not defined')

    return new NSQConsumer({
      provider: Provider.NSQ,
      topic: config.topic,
      channel: config.channel,
      hosts: config.hosts
    })
  }
}
