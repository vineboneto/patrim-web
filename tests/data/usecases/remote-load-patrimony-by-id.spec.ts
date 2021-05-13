import { RemoteLoadPatrimonyById } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadPatrimonyById
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadPatrimonyById(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadPatrimonyById', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const id = faker.datatype.number()
    const url = faker.internet.url().concat(`/${id}`)
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadById({ id })
    expect(httpClientSpy.params.method).toBe('get')
    expect(httpClientSpy.params.url).toBe(url)
  })
})
