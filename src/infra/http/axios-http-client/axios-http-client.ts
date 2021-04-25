import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'

import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (params: HttpRequest): Promise<HttpResponse> {
    axios.request({
      headers: params.headers,
      data: params.body,
      method: params.method,
      url: params.url
    })
    return null
  }
}
