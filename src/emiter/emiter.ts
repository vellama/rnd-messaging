import { EmiterConfig, Emiter as EmiterType } from './emiter.types'

import { Emiter as NSQEmiter } from '../providers/nsq/nsq.emiter'
import { Provider } from '../providers/enums/providers.enums'

export class Emiter {
  private emiter: EmiterType

  public constructor(config: EmiterConfig) {
    this.emiter = this.initEmiter(config)
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

  private connect(emiter: EmiterType) {
    if (!emiter.isReady) {
      emiter.connect()

      setTimeout(() => {
        this.connect(emiter)
      }, 1000)
    }
  }
}
