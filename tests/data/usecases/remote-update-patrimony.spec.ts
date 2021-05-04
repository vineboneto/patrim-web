import { RemoteUpdatePatrimony } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockUpdatePatrimonyParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteUpdatePatrimony
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteUpdatePatrimony(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteUpdatePatrimony', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(httpClientSpy.params.body).toEqual(params)
    expect(httpClientSpy.params.method).toBe('put')
    expect(httpClientSpy.params.url).toBe(url)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
