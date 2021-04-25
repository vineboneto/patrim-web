import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['post', 'get', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  params: HttpRequest
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (params: HttpRequest): Promise<HttpResponse<R>> {
    this.params = params
    return this.response
  }
}
