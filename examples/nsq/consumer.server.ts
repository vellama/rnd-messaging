import { Provider } from '../../src/enums/providers.enums'
import {
  ConsumerConfig as NSQConfig,
  HostConfig
} from '../../src/_providers/nsq/nsq.types'
import { Consumer } from '../../src/consumer/consumer-singleton'
import dotenv from 'dotenv'
import { Message } from 'nsqjs'

dotenv.config()

const consumerServer = () => {
  if (!process.env.NSQ_LOOKUP_HOSTS) throw new Error('no nsq lookup hosts')
  if (!process.env.NSQ_HOSTS) throw new Error('no nsq hosts')

  const nsqHosts = process.env.NSQ_LOOKUP_HOSTS.split(',').map(host => {
    const hostParams = host.split(':')
    const hostConfig: HostConfig = {
      host: hostParams[0],
      port: parseInt(hostParams[1])
    }

    return hostConfig
  })

  const nsqConfig: NSQConfig = {
    provider: Provider.NSQ,
    hosts: nsqHosts,
    topic: 'test-topic',
    channel: 'consumer-group'
  }

  const consumer = Consumer.getInstance(nsqConfig)
  consumer.startConsuming((msg: Message) => {
    console.log(msg.body.toString())
  })
}

consumerServer()
