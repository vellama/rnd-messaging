import { Writer } from 'nsqjs'

import {
  EmiterImplementation,
  DispatchResponse
} from '../../emiter/emiter.types'
import { EmiterConfig } from './nsq.types'

export class Emiter implements EmiterImplementation {
  private topic: string
  private writer: Writer

  public constructor (config: EmiterConfig) {
    this.writer = this.initWriter(config)
    this.topic = config.topic
  }

  public connect () {
    this.writer.connect()
  }

  public disconnect () {
    this.writer.close()
  }

  public dispatch<T> (input: T): DispatchResponse {
    const res = this.writer.emit(this.topic, input)

    const status = res ? 200 : 400

    return {
      status,
      body: {
        input
      }
    }
  }

  public onConnected (handler: Function) {
    this.writer.on('ready', () => handler())
  }

  public onDisconnected (handler: Function) {
    this.writer.on('closed', () => handler())
  }

  private initWriter (config: EmiterConfig): Writer {
    const writer = new Writer(config.host.address, config.host.port)

    writer.on('ready', () => {
      console.log(`writer for ${config.topic} ready ...`)
    })

    return writer
  }
}
