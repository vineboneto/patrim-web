import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'

import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (params: HttpRequest): Promise<HttpResponse> {
    const axiosResponse = await axios.request({
      headers: params.headers,
      data: params.body,
      method: params.method,
      url: params.url
    })
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
