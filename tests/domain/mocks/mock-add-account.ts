import { AddAccount } from '@/domain/usecases'

import faker from 'faker'

export const mockAccountModel = (): AddAccount.Model => ({
  name: faker.name.findName(),
  accessToken: faker.datatype.uuid()
})

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  account = mockAccountModel()
  callsCount = 0

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
