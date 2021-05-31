import { RemoteLoadPatrimoniesBySectorId } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockLoadPatrimoniesBySectorIdParams, mockPatrimoniesModel } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadPatrimoniesBySectorId
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadPatrimoniesBySectorId(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadPatrimoniesBySectorId', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const params = mockLoadPatrimoniesBySectorIdParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadBySectorId(params)
    expect(httpClientSpy.params.method).toBe('get')
    expect(httpClientSpy.params.url).toBe(`${url}/${params.id}/patrimonies?take=${params.take}&skip=${params.skip}`)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an patrimonies if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockPatrimoniesModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    expect(data).toEqual(body)
  })

  test('Should return  array empty if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = []
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body
    }
    const data = await sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    expect(data).toEqual(body)
  })
})
