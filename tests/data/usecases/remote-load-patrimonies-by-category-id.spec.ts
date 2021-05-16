import { RemoteLoadPatrimoniesByCategoryId } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockLoadPatrimoniesByCategoryIdParams, mockPatrimoniesModel } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadPatrimoniesByCategoryId
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadPatrimoniesByCategoryId(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadPatrimoniesByCategoryId', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const params = mockLoadPatrimoniesByCategoryIdParams()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadByCategoryId(params)
    expect(httpClientSpy.params.method).toBe('get')
    expect(httpClientSpy.params.url).toBe(`${url}/${params.id}/patrimonies?take=${params.take}&skip=${params.skip}`)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an patrimonies if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockPatrimoniesModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdParams())
    expect(data).toEqual(body)
  })
})
