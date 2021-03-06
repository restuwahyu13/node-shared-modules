import 'dotenv/config'
import { Kafka } from '@rebel/kafka'

// publisher demo here
;(async () => {
  const kafka: InstanceType<typeof Kafka> = new Kafka({
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    clientId: process.env.KAFKA_CLIENT_ID,
    ssl: false
  })

  let i: number = 0
  setInterval(async () => {
    await kafka.publisher({
      type: 'single',
      sendConfig: {
        topic: 'message-text-google',
        messages: [{ key: 'msg', value: `${i++} hello wordl from publisher:${new Date().getTime()}` }],
        acks: 0
      },
      producerConfig: { allowAutoTopicCreation: false }
    })
  }, 2000)
})()
