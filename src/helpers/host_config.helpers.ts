import { HostConfig } from '../shared/types/connection.types'

export const formatHostConfigs = (hosts: string): HostConfig[] => {
  return hosts.split(',').map(host => {
    const hostParts = host.split(':')
    const res: HostConfig = {
      address: hostParts[0],
      port: parseInt(hostParts[1])
    }

    return res
  })
}
