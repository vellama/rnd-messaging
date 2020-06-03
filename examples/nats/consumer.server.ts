import dotenv from 'dotenv'

import { Provider } from '../../src/enums/providers.enums'
import { Consumer } from '../../src/consumer/consumer'
import { formatHostConfigs } from '../../src/helpers/host_config.helpers'
import { ConsumerConfig } from '../../src/consumer/consumer.types'

;(() => {
  dotenv.config()
  if (!process.env.NATS_HOSTS) throw new Error('no nats hosts')

  const natsHosts = formatHostConfigs(process.env.NATS_HOSTS)

  const natsConfig: ConsumerConfig = {
    provider: Provider.NATS,
    hosts: natsHosts,
    topic: 'test-topic',
    channel: 'consumer-group'
  }

  const consumer = new Consumer(natsConfig)
  consumer.startConsuming((msg: any) => {
    console.log(msg)
  })
})()
