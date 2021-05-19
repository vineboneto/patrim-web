import { RemoteDeleteOwner } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, LinkedDataError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockOwnerModel, mockDeleteOwnerParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteDeleteOwner
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteDeleteOwner(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDeleteOwner', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockDeleteOwnerParams()
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
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnprocessableEntity if HttpGetClient returns 422', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unprocessableEntity
    }
    const params = mockDeleteOwnerParams()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new LinkedDataError('proprietário'))
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an owner if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockOwnerModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.delete(mockDeleteOwnerParams())
    expect(data).toEqual(body)
  })
})
