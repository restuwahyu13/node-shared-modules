import 'dotenv/config'
import { Kafka, EachMessagePayload } from '@rebel/kafka'

// subscriber demo here
;(async () => {
  const kafka: InstanceType<typeof Kafka> = new Kafka({
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    clientId: process.env.KAFKA_CLIENT_ID,
    ssl: false
  })

  await kafka.subscriber(
    {
      subscribeConfig: { topics: ['message-text-google'], fromBeginning: true },
      consumerConfig: { groupId: 'kafka:group' },
      runConfig: { autoCommit: true }
    },
    async (payload: EachMessagePayload): Promise<void> => console.log(payload.message.value.toString())
  )
})()
