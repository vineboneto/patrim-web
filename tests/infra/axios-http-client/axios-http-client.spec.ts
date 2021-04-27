import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { mockHttpRequest } from '@/tests/data/mocks'
import { mockAxios, mockHttpResponse } from '@/tests/infra/mocks'

import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockHttpRequest()
    await sut.request(request)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  test('Should return the correct response on axios', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return the correct error on axios', async () => {
    const { sut, mockedAxios } = makeSut()
    const response = mockHttpResponse()
    mockedAxios.request.mockRejectedValueOnce({
      response
    })
    const error = await sut.request(mockHttpRequest())
    expect(error).toEqual({
      body: response.data,
      statusCode: response.status
    })
  })
})
