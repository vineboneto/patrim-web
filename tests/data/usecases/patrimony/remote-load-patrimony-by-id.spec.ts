import { RemoteLoadPatrimonyById } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockPatrimonyModel } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadPatrimonyById
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url().concat(`/${faker.datatype.number()}`)): SutTypes => {
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

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadById({ id: faker.datatype.number() })
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadById({ id: faker.datatype.number() })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadById({ id: faker.datatype.number() })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an patrimony if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = mockPatrimonyModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const data = await sut.loadById({ id: faker.datatype.number() })
    expect(data).toEqual(body)
  })

  test('Should return  array empty if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    const body = []
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body
    }
    const data = await sut.loadById({ id: faker.datatype.number() })
    expect(data).toEqual(body)
  })
})
