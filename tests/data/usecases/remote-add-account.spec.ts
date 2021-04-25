import { RemoteAddAccount } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddAccount(httpClientSpy, url)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpClient Client with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(httpClientSpy.params.body).toEqual(params)
    expect(httpClientSpy.params.method).toBe('post')
    expect(httpClientSpy.params.url).toBe(url)
  })

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
