import { RemoteAddSector } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError, UnprocessableEntityError } from '@/domain/errors'
import { mockAddSectorParams, mockSectorModel } from '@/tests/domain/mocks'
import { HttpClientSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddSector
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddSector(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddSector', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockAddSectorParams()
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
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnprocessableEntity if HttpGetClient returns 422', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unprocessableEntity
    }
    const params = mockAddSectorParams()
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(new UnprocessableEntityError('nome', params.name))
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an patrimony if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockSectorModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.add(mockAddSectorParams())
    expect(data).toEqual(body)
  })
})
