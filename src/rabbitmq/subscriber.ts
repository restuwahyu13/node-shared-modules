import { RabbitMQ, RabbitMQConfig } from '@rebel/rabbitmq'

// subscriber demo here
;(async () => {
  try {
    const rabbitmqConfig: RabbitMQConfig = {
      vhost: process.env.RABBITMQ_VHOST,
      hostname: process.env.RABBITMQ_HOST,
      protocol: process.env.RABBITMQ_PROTOCOL,
      user: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      port: +process.env.RABBITMQ_PORT
    }

    const broker: InstanceType<typeof RabbitMQ> = new RabbitMQ(rabbitmqConfig, 'message:text', 'google')
    broker.subscriber((content: string, error: Error) => {
      if (!error) console.log(content)
    })
  } catch (err) {
    console.error(err)
  }
})()
