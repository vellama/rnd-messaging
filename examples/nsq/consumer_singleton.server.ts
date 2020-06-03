import dotenv from 'dotenv'
import { Message } from 'nsqjs'

import { Provider } from '../../src/enums/providers.enums'
import { ConsumerConfig as NSQConfig } from '../../src/_providers/nsq/nsq.types'
import { Consumer } from '../../src/consumer/consumer-singleton'
import { formatHostConfigs } from '../../src/helpers/host_config.helpers'

dotenv.config()

const consumerServer = () => {
  if (!process.env.NSQ_LOOKUP_HOSTS) throw new Error('no nsq lookup hosts')

  const nsqHosts = formatHostConfigs(process.env.NSQ_LOOKUP_HOSTS)

  const nsqConfig: NSQConfig = {
    provider: Provider.NSQ,
    hosts: nsqHosts,
    topic: 'test-topic',
    channel: 'consumer-group'
  }

  const consumer = Consumer.getInstance(nsqConfig)
  consumer.connect()
  consumer.startConsuming((msg: Message) => {
    console.log(msg.body.toString())
  })
}

consumerServer()
