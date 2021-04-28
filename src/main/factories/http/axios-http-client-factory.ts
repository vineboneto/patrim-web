import { HttpClient } from '@/data/protocols'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'

export const makeAxiosHttpClient = (): HttpClient => {
  return new AxiosHttpClient()
}
