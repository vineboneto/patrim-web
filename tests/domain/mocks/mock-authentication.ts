import { Authentication } from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  account = mockAccountModel()
  callsCount = 0

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
