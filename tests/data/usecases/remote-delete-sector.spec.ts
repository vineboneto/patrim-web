import { RemoteDeleteSector } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, LinkedDataError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockSectorModel, mockDeleteSectorParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteDeleteSector
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteDeleteSector(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDeleteSector', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockDeleteSectorParams()
    await sut.delete(params)
    expect(httpClientSpy.params.body).toEqual(params)
    expect(httpClientSpy.params.method).toBe('delete')
    expect(httpClientSpy.params.url).toBe(`${url}/${params.id}`)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnprocessableEntity if HttpGetClient returns 422', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unprocessableEntity
    }
    const params = mockDeleteSectorParams()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new LinkedDataError('setor'))
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an sector if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockSectorModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.delete(mockDeleteSectorParams())
    expect(data).toEqual(body)
  })
})
