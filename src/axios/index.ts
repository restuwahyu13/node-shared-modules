import 'dotenv/config'
import { httpClientGet } from '@rebel/axios'

// example fetching data from api
;(async () => {
  try {
    const res: Record<string, any> = await httpClientGet(process.env.API_URL)
    console.log(res)
  } catch (e: any) {
    console.error(e)
  }
})()
