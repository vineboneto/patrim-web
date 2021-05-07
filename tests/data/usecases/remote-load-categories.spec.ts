import { RemoteLoadCategories } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadCategories
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadCategories(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('LoadCategories', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.load()
    expect(httpClientSpy.params.method).toBe('get')
    expect(httpClientSpy.params.url).toBe(url)
  })
})
