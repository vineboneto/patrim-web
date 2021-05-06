import { RemoteUpdatePatrimony } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError, UnprocessableEntityError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockPatrimonyModel, mockUpdatePatrimonyParams } from '@/tests/domain/mocks'

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

  test('Should throw UnprocessableEntity if HttpGetClient returns 422', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unprocessableEntity
    }
    const params = mockUpdatePatrimonyParams()
    const promise = sut.update(params)
    await expect(promise).rejects.toThrow(new UnprocessableEntityError('número', params.number))
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an patrimony if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockPatrimonyModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.update(mockUpdatePatrimonyParams())
    expect(data).toEqual(body)
  })
})
