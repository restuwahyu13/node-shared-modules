import { RabbitMQ, RabbitMQConfig } from '@rebel/rabbitmq'

// publisher demo here
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

    let i: number = 0
    setInterval(async () => {
      const res = await broker.publisher({ message: `${i++} hello wordl from publisher:${new Date().getTime()}` })
      console.log(res)
    }, 2000)
  } catch (err) {
    console.error(err)
  }
})()
