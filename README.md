# rnd-messaging

## NSQ

1. start nsqlookupd

```sh
nsqlookupd
```

2. start nsqd

```sh
nsqd -lookupd-tcp-address=127.0.0.1:4160 -broadcast-address=127.0.0.1
```
