import 'dotenv/config'
import { Kafka } from '@rebel/kafka'
import zlib from 'zlib'

// publisher demo here
;(async () => {
  const kafka: InstanceType<typeof Kafka> = new Kafka({
    brokers: [`${process.env.KAFKA_BROKER_HOST}:${process.env.KAFKA_PORT}`],
    clientId: process.env.KAFKA_CLIENTID,
    ssl: false
  })

  let i: number = 0
  setInterval(async () => {
    await kafka.publisher({
      type: 'single',
      sendConfig: {
        topic: 'message:text:google',
        messages: [{ key: 'msg', value: `${i++} hello wordl from publisher:${new Date().getTime()}` }],
        acks: 0,
        compression: zlib.constants.Z_BEST_COMPRESSION
      },
      producerConfig: { allowAutoTopicCreation: false }
    })
  }, 2000)
})()
