import { RemoteAddPatrimony } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockAddPatrimonyParams } from '@/tests/domain/mocks'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddPatrimony
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddPatrimony(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddPatrimony', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockAddPatrimonyParams()
    await sut.add(params)
    expect(httpClientSpy.params.body).toEqual(params)
    expect(httpClientSpy.params.method).toBe('post')
    expect(httpClientSpy.params.url).toBe(url)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddPatrimonyParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddPatrimonyParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
