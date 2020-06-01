import { Reader, Message } from 'nsqjs'

import { ConsumerConfig, HostConfig } from './nsq.types'
import { ConsumerImplementation } from '../../consumer/consumer.types'

export class Consumer implements ConsumerImplementation {
  private reader: Reader
  public isReady: boolean = false

  public constructor(config: ConsumerConfig) {
    this.reader = this.initReader(config)
  }

  public connect() {
    this.reader.connect()
  }

  public disconnect() {
    this.reader.close()
  }

  public startConsuming(handler: Function) {
    this.reader.on('message', (msg: Message) => {
      handler(msg)
      msg.finish()
    })
  }

  public onDisconnected(handler: Function) {
    this.reader.on('nsqd_closed', (host, port) => handler(host, port))
  }

  private initReader(config: ConsumerConfig): Reader {
    const reader = new Reader(config.topic, config.channel, {
      lookupdHTTPAddresses: this.formatHosts(config.hosts)
    })

    reader.on('nsqd_connected', () => {
      console.log(`consumer for ${config.topic} ready ...`)
      this.isReady = true
    })
    reader.on('nsqd_closed', () => (this.isReady = false))

    return reader
  }

  private formatHosts = (hosts: HostConfig[]): string | string[] => {
    return hosts.map(hostConfig => `${hostConfig.host}:${hostConfig.port}`)
  }
}
