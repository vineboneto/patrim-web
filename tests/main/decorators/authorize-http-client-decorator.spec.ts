import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { HttpRequest } from '@/data/protocols'
import { mockHttpRequest, GetStorageSpy, HttpClientSpy } from '@/tests/data/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)
  return {
    sut,
    getStorageSpy,
    httpClientSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['post', 'get', 'put', 'delete']),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.params.url).toBe(httpRequest.url)
    expect(httpClientSpy.params.method).toBe(httpRequest.method)
    expect(httpClientSpy.params.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttGetClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['post', 'get', 'put', 'delete'])
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.params.url).toBe(httpRequest.url)
    expect(httpClientSpy.params.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers to HttGetClient get client', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.words()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['post', 'get', 'put', 'delete']),
      headers: {
        field
      }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.params.url).toBe(httpRequest.url)
    expect(httpClientSpy.params.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should return the same result as HttGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
