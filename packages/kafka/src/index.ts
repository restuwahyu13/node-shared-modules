import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  EachBatchHandler,
  EachMessagePayload,
  Kafka as KafkaJs,
  KafkaConfig,
  Producer,
  ProducerBatch,
  ProducerConfig,
  ProducerRecord,
  Transaction
} from 'kafkajs'

interface ConsumerRunConfig {
  autoCommit?: boolean
  autoCommitInterval?: number | null
  autoCommitThreshold?: number | null
  eachBatchAutoResolve?: boolean
  partitionsConsumedConcurrently?: number
  eachBatch?: EachBatchHandler
}

interface SubscriberPayload {
  subscribeConfig: ConsumerSubscribeTopics
  consumerConfig: ConsumerConfig
  runConfig: ConsumerRunConfig
}

interface PublisherPayload {
  type: 'single' | 'multiple'
  sendConfig: ProducerRecord | ProducerBatch
  producerConfig?: ProducerConfig
}

interface PublisherTransactionPayload {
  type: 'single' | 'multiple'
  sendConfig: ProducerRecord | ProducerBatch
  producerConfig?: ProducerConfig
}

class Kafka {
  private config: KafkaConfig
  private kafka: InstanceType<typeof KafkaJs>
  private producer: Producer
  private consumer: Consumer
  private transaction: Transaction

  constructor(config: KafkaConfig) {
    this.config = config
    this.kafka = new KafkaJs(this.config)
  }

  async publisher(options: PublisherPayload): Promise<void> {
    try {
      this.producer = this.kafka.producer(options.producerConfig || {})
      await this.notification('publisher', this.producer)
      await this.producer.connect()

      options.type == 'single'
        ? await this.producer.send(options.sendConfig as ProducerRecord)
        : await this.producer.sendBatch(options.sendConfig as ProducerBatch)

      await this.producer.disconnect()
    } catch (e: any) {
      console.error(`publisher is not working: ${e}`)
    }
  }

  async publisherTransaction(options: PublisherTransactionPayload): Promise<void> {
    try {
      this.producer = this.kafka.producer(options.producerConfig || {})
      this.transaction = await this.producer.transaction()
      try {
        await this.notification('publisher', this.producer)
        await this.producer.connect()

        options.type == 'single'
          ? await this.producer.send(options.sendConfig as ProducerRecord)
          : await this.producer.sendBatch(options.sendConfig as ProducerBatch)

        await this.transaction.commit()
        await this.producer.disconnect()
      } catch (e: any) {
        if (this.transaction.isActive()) this.transaction.abort()
        console.error(`publisher transaction is not working: ${e}`)
      }
    } catch (e: any) {
      console.error(`publisher transaction is not working: ${e}`)
    }
  }

  async subscriber(options: SubscriberPayload, cb: (payload: EachMessagePayload) => Promise<void>): Promise<void> {
    try {
      this.consumer = this.kafka.consumer(options.consumerConfig)
      this.notification('subscriber', this.consumer)

      await this.consumer.connect()
      await this.consumer.subscribe(options.subscribeConfig)
      await this.consumer.run({ ...(options.runConfig || {}), eachMessage: cb })
    } catch (e: any) {
      console.error(`subscriber is not working: ${e}`)
    }
  }

  private async notification(type: string, handler: Producer | Consumer): Promise<void> {
    try {
      if (type == 'subscriber') {
        this.consumer = handler as Consumer
        await this.consumer.on('consumer.connect', () => console.info('consumer kafka connected'))
        await this.consumer.on('consumer.network.request_timeout', () => console.error('consumer kafka network timeout'))
        await this.consumer.on('consumer.crash', async (): Promise<void> => {
          await this.consumer.disconnect()
          console.error('consumer kafka crash')
        })
        await this.consumer.on('consumer.disconnect', async (): Promise<void> => {
          await this.consumer.disconnect()
          console.error('consumer kafka disconnect')
        })
        await this.consumer.on('consumer.stop', async (): Promise<void> => {
          await this.consumer.stop()
          console.error('consumer kafka disconnect')
        })
      }

      if (type == 'publisher') {
        this.producer = handler as Producer
        await this.producer.on('producer.connect', (): void => console.info('producer kafka connected'))
        await this.producer.on('producer.network.request_timeout', (): void => console.error('producer kafka network timeout'))
        await this.producer.on('producer.disconnect', async (): Promise<void> => {
          await this.producer.disconnect()
          console.error('producer kafka disconnect')
        })
      }
    } catch (e: any) {
      console.error(`notification is not working: ${e}`)
    }
  }
}

export { Kafka, EachMessagePayload }
