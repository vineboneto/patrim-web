import { RemoteAddAccount } from '@/data/usecases'
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

import faker from 'faker'

class HttpClientSpy<R = any> implements HttpClient<R> {
  params: HttpRequest
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (params: HttpRequest): Promise<HttpResponse<R>> {
    this.params = params
    return this.response
  }
}

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddAccount(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpClientSpy Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const password = faker.internet.password()
    const params = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
    await sut.add(params)
    expect(httpClientSpy.params.body).toEqual(params)
    expect(httpClientSpy.params.method).toBe('post')
    expect(httpClientSpy.params.url).toBe(url)
  })
})
