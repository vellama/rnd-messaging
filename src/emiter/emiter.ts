import {
  EmiterConfig,
  Emiter as EmiterType,
  EmiterImplementation,
  Response
} from './emiter.types'

import { Emiter as NSQEmiter } from '../_providers/nsq/nsq.emiter'
import { Provider } from '../enums/providers.enums'

export class Emiter implements EmiterImplementation {
  private emiter: EmiterType

  public constructor(config: EmiterConfig) {
    this.emiter = this.initEmiter(config)
  }

  public connect() {
    this.emiter.connect()
  }

  public disconnect() {
    this.emiter.disconnect()
  }

  public onConnected(handler: Function) {
    this.emiter.onConnected(handler)
  }

  public onDisconnected(handler: Function) {
    this.emiter.onDisconnected(handler)
  }

  public dispatch<T>(input: T): Response {
    return this.emiter.dispatch(input)
  }

  private initEmiter(config: EmiterConfig): EmiterType {
    let emiter: EmiterType

    switch (config.provider) {
      case Provider.NSQ:
        emiter = this.initSQSEmiter(config)
        break
      default:
        throw new Error('provider not supported')
    }

    return emiter
  }

  private initSQSEmiter(config: EmiterConfig): NSQEmiter {
    return new NSQEmiter(config)
  }
}
