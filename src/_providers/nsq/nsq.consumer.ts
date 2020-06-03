import { Reader, Message } from 'nsqjs'

import { ConsumerImplementation } from '../../consumer/consumer.types'
import { ConsumerConfig } from './nsq.types'
import { HostConfig } from '../../shared/types/connection.types'

export class Consumer implements ConsumerImplementation {
  private reader: Reader

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

  public onConnected(handler: Function) {
    this.reader.on('nsqd_connected', () => {
      handler()
    })
  }

  public onDisconnected(handler: Function) {
    this.reader.on('nsqd_closed', (host, port) => {
      handler(host, port)
    })
  }

  private initReader(config: ConsumerConfig): Reader {
    const reader = new Reader(config.topic, config.channel, {
      lookupdHTTPAddresses: this.formatHosts(config.hosts)
    })

    reader.on('nsqd_connected', () => {
      console.log(`consumer for ${config.topic} ready ...`)
    })

    return reader
  }

  private formatHosts = (hosts: HostConfig[]): string | string[] => {
    return hosts.map(hostConfig => `${hostConfig.address}:${hostConfig.port}`)
  }
}
