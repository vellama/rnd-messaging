import { connect as natsConnect, Client, Payload } from 'ts-nats'

import { ConsumerImplementation } from '../../consumer/consumer.types'
import { ConsumerConfig } from './nats.types'
import { HostConfig } from '../../shared/types/connection.types'

export class Consumer implements ConsumerImplementation {
  private config: ConsumerConfig
  private consumer: Client | null = null

  public constructor(consumerConfig: ConsumerConfig) {
    this.config = consumerConfig
    this.initClient(consumerConfig)
  }

  public connect() {
    this.initClient(this.config)
  }

  public disconnect() {
    if (!this.consumer) return
    this.consumer.close()
  }

  public onConnected(handler: Function) {
    if (!this.consumer) {
      return
    }

    this.consumer.on('connect', () => {
      handler()
    })
  }

  public onDisconnected(handler: Function) {
    if (!this.consumer) {
      console.log('not ready')
      return
    }

    this.consumer.on('disconnect', url => {
      handler(url)
    })
  }

  public startConsuming(handler: Function) {
    if (!this.consumer) {
      console.log('not ready')
      return
    }

    this.consumer.subscribe(
      this.config.topic,
      (err, msg) => {
        if (err) console.log(err)
        handler(msg)
      },
      {
        queue: this.config.channel
      }
    )
  }

  private async initClient(consumerConfig: ConsumerConfig) {
    this.consumer = await natsConnect({
      servers: this._formatHosts(consumerConfig.hosts),
      payload: Payload.JSON
    })
  }

  private _formatHosts(hosts: HostConfig[]): string[] {
    return hosts.map(host => {
      const protocol = host.tls ? 'tls' : 'nats'
      let url = host.address
      if (host.port) url = `${url}:${host.port}`
      return `${protocol}://${url}`
    })
  }
}
