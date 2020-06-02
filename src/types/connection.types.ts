export interface HostConfig {
  address: string
  port: number
  tls?: boolean
}

export interface AuthenticationConfig {
  username?: string
  password?: string
  token?: string
}
