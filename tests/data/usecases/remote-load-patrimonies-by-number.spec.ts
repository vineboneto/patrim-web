import { RemoteLoadPatrimoniesByNumber } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockLoadPatrimoniesByNumberParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadPatrimoniesByNumber
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadPatrimoniesByNumber(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadPatrimonies', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const params = mockLoadPatrimoniesByNumberParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadByNumber(params)
    expect(httpClientSpy.params.method).toBe('get')
    expect(httpClientSpy.params.url).toBe(`${url}/${params.number}/number`)
  })
})
